import { useCallback, useMemo, useEffect } from 'react';
import { useQuizStore, QuizMode } from '../stores/quizStore';
import supabase from '../lib/supabaseClient';
import { useState } from 'react';

interface UseQuizOptions {
  quizId?: string;
  mode?: QuizMode;
  autoStart?: boolean;
}

interface QuizState {
  // Quiz Data
  currentQuiz: any | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  
  // Quiz Status
  isQuizActive: boolean;
  isLoading: boolean;
  error: string | null;
  
  // User Progress
  userAnswers: (number | boolean | null)[];
  score: number;
  streak: number;
  progress: number;
  
  // UI State
  showFeedback: boolean;
  lastAnswerCorrect: boolean;
  isComplete: boolean;
  
  // Results
  results: any | null;
}

interface QuizActions {
  // Quiz Control
  startQuiz: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
  
  // Navigation
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  
  // Answering
  answerQuestion: (answer: number | boolean) => void;
  
  // Mode
  setMode: (mode: QuizMode) => void;
  
  // Error Handling
  retry: () => void;
  clearError: () => void;
}

export function useQuiz(options: UseQuizOptions = {}): QuizState & QuizActions {
  const {
    quizId,
    mode = QuizMode.PRACTICE,
    autoStart = false
  } = options;

  // Zustand store'dan state'leri al
  const {
    currentQuiz,
    mode: storeMode,
    currentQuestionIndex,
    userAnswers,
    score,
    streak,
    isQuizActive,
    showFeedback,
    lastAnswerCorrect,
    startTime,
    results,
    
    // Actions
    setQuiz,
    setMode,
    startQuiz: storeStartQuiz,
    answerQuestion: storeAnswerQuestion,
    nextQuestion: storeNextQuestion,
    previousQuestion: storePreviousQuestion,
    goToQuestion: storeGoToQuestion,
    completeQuiz: storeCompleteQuiz,
    resetQuiz: storeResetQuiz,
    toggleFeedback
  } = useQuizStore();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computed values
  const totalQuestions = useMemo(() => 
    currentQuiz?.questions?.length || 0, 
    [currentQuiz]
  );

  const progress = useMemo(() => 
    totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0,
    [currentQuestionIndex, totalQuestions]
  );

  const isComplete = useMemo(() => 
    results !== null || (currentQuestionIndex >= totalQuestions - 1 && isQuizActive),
    [results, currentQuestionIndex, totalQuestions, isQuizActive]
  );

  // Load quiz data
  const loadQuiz = useCallback(async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Supabase'den quiz verisini çek
      const { data, error: fetchError } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .eq('type', 'quiz')
        .single();

      if (fetchError) throw fetchError;
      if (!data) throw new Error('Quiz bulunamadı');

      setQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Quiz yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [setQuiz]);

  // Quiz'i başlat
  const startQuiz = useCallback(() => {
    if (!currentQuiz) {
      setError('Quiz yüklenmedi');
      return;
    }
    
    storeStartQuiz();
    setError(null);
  }, [currentQuiz, storeStartQuiz]);

  // Quiz'i sıfırla
  const resetQuiz = useCallback(() => {
    storeResetQuiz();
    setError(null);
  }, [storeResetQuiz]);

  // Quiz'i tamamla
  const completeQuiz = useCallback(() => {
    if (!isQuizActive) return;
    
    storeCompleteQuiz();
    
    // Analytics event gönder
    if (results) {
      supabase.from('analytics_events').insert({
        event_type: 'quiz_completed',
        event_data: {
          quiz_id: currentQuiz?.id,
          mode: storeMode,
          score: results.score,
          total_questions: results.totalQuestions,
          time_spent: results.timeSpent
        }
      }).catch(console.error);
    }
  }, [isQuizActive, storeCompleteQuiz, results, currentQuiz?.id, storeMode]);

  // Soruya cevap ver
  const answerQuestion = useCallback((answer: number | boolean) => {
    if (!isQuizActive || !currentQuiz) return;
    
    storeAnswerQuestion(answer);
    
    // Analytics event gönder
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    supabase.from('analytics_events').insert({
      event_type: 'question_answered',
      event_data: {
        quiz_id: currentQuiz.id,
        question_id: currentQuestion?.id,
        answer,
        is_correct: answer === currentQuestion?.correct,
        time_spent: startTime ? Date.now() - startTime : 0
      }
    }).catch(console.error);
  }, [isQuizActive, currentQuiz, currentQuestionIndex, storeAnswerQuestion, startTime]);

  // Sonraki soruya geç
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      storeNextQuestion();
    } else if (storeMode !== QuizMode.PRACTICE) {
      completeQuiz();
    }
  }, [currentQuestionIndex, totalQuestions, storeMode, storeNextQuestion, completeQuiz]);

  // Önceki soruya geç
  const previousQuestion = useCallback(() => {
    storePreviousQuestion();
  }, [storePreviousQuestion]);

  // Belirli soruya git
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < totalQuestions) {
      storeGoToQuestion(index);
    }
  }, [totalQuestions, storeGoToQuestion]);

  // Mode değiştir
  const setQuizMode = useCallback((newMode: QuizMode) => {
    setMode(newMode);
  }, [setMode]);

  // Hata durumunda tekrar dene
  const retry = useCallback(() => {
    if (quizId) {
      loadQuiz(quizId);
    }
  }, [quizId, loadQuiz]);

  // Hatayı temizle
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-start effect
  useEffect(() => {
    if (autoStart && currentQuiz && !isQuizActive) {
      startQuiz();
    }
  }, [autoStart, currentQuiz, isQuizActive, startQuiz]);

  // Quiz ID değiştiğinde yükle
  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId);
    }
  }, [quizId, loadQuiz]);

  // Mode değiştiğinde store'u güncelle
  useEffect(() => {
    if (storeMode !== mode) {
      setMode(mode);
    }
  }, [mode, storeMode, setMode]);

  return {
    // State
    currentQuiz,
    currentQuestionIndex,
    totalQuestions,
    isQuizActive,
    isLoading,
    error,
    userAnswers,
    score,
    streak,
    progress,
    showFeedback,
    lastAnswerCorrect,
    isComplete,
    results,
    
    // Actions
    startQuiz,
    resetQuiz,
    completeQuiz,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    answerQuestion,
    setMode: setQuizMode,
    retry,
    clearError
  };
}

// Utility hook for quiz validation
export function useQuizValidation() {
  const { currentQuiz, userAnswers, currentQuestionIndex } = useQuizStore();
  
  const currentQuestion = useMemo(() => 
    currentQuiz?.questions?.[currentQuestionIndex] || null,
    [currentQuiz, currentQuestionIndex]
  );
  
  const isAnswered = useMemo(() => 
    userAnswers[currentQuestionIndex] !== null && userAnswers[currentQuestionIndex] !== undefined,
    [userAnswers, currentQuestionIndex]
  );
  
  const isCorrect = useMemo(() => {
    if (!isAnswered || !currentQuestion) return false;
    return userAnswers[currentQuestionIndex] === currentQuestion.correct;
  }, [isAnswered, currentQuestion, userAnswers, currentQuestionIndex]);
  
  return {
    currentQuestion,
    isAnswered,
    isCorrect
  };
}

// Utility hook for quiz navigation
export function useQuizNavigation() {
  const { currentQuestionIndex, totalQuestions, goToQuestion, nextQuestion, previousQuestion } = useQuiz();
  
  const canGoNext = useMemo(() => 
    currentQuestionIndex < totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );
  
  const canGoPrevious = useMemo(() => 
    currentQuestionIndex > 0,
    [currentQuestionIndex]
  );
  
  const isFirstQuestion = useMemo(() => 
    currentQuestionIndex === 0,
    [currentQuestionIndex]
  );
  
  const isLastQuestion = useMemo(() => 
    currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );
  
  return {
    canGoNext,
    canGoPrevious,
    isFirstQuestion,
    isLastQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion
  };
}
