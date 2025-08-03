import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export enum QuizMode {
  PRACTICE = 'practice',
  TEST = 'test',
  REVIEW = 'review'
}

interface Question {
  id: number;
  question: string;
  type: 'multiple_choice' | 'true_false';
  options?: string[];
  correct: number | boolean;
  points: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuizData {
  id: string;
  title: string;
  subject: string;
  grade: number;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

interface QuizResults {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  answers: (number | boolean)[];
  pointsEarned: number;
  streakBonus: number;
}

interface QuizState {
  // State
  currentQuiz: QuizData | null;
  mode: QuizMode;
  currentQuestionIndex: number;
  userAnswers: (number | boolean | null)[];
  score: number;
  streak: number;
  isQuizActive: boolean;
  showFeedback: boolean;
  lastAnswerCorrect: boolean;
  startTime: number | null;
  results: QuizResults | null;
  reviewQuestions: Question[];
  
  // Actions
  setQuiz: (quiz: QuizData) => void;
  setMode: (mode: QuizMode) => void;
  startQuiz: () => void;
  answerQuestion: (answer: number | boolean) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  setReviewQuestions: (questions: Question[]) => void;
  toggleFeedback: (show: boolean) => void;
}

export const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentQuiz: null,
        mode: QuizMode.PRACTICE,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        streak: 0,
        isQuizActive: false,
        showFeedback: false,
        lastAnswerCorrect: false,
        startTime: null,
        results: null,
        reviewQuestions: [],

        // Actions
        setQuiz: (quiz) => set({ 
          currentQuiz: quiz,
          userAnswers: new Array(quiz.questions.length).fill(null),
          currentQuestionIndex: 0,
          score: 0,
          streak: 0,
          results: null
        }),

        setMode: (mode) => set({ mode }),

        startQuiz: () => set({ 
          isQuizActive: true, 
          startTime: Date.now(),
          currentQuestionIndex: 0,
          score: 0,
          streak: 0,
          userAnswers: get().currentQuiz ? new Array(get().currentQuiz!.questions.length).fill(null) : []
        }),

        answerQuestion: (answer) => {
          const state = get();
          if (!state.currentQuiz || !state.isQuizActive) return;

          const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
          const isCorrect = answer === currentQuestion.correct;
          
          // Update user answers
          const newAnswers = [...state.userAnswers];
          newAnswers[state.currentQuestionIndex] = answer;

          // Calculate points (MVP için basit hesaplama)
          let pointsEarned = 0;
          if (isCorrect) {
            pointsEarned = currentQuestion.points;
            // Streak bonus
            if (state.streak > 0) {
              pointsEarned += Math.min(state.streak * 2, 10); // Max 10 bonus points
            }
          }

          set({
            userAnswers: newAnswers,
            score: isCorrect ? state.score + pointsEarned : state.score,
            streak: isCorrect ? state.streak + 1 : 0,
            lastAnswerCorrect: isCorrect,
            showFeedback: state.mode === QuizMode.PRACTICE
          });
        },

        nextQuestion: () => {
          const state = get();
          if (!state.currentQuiz) return;

          const nextIndex = state.currentQuestionIndex + 1;
          
          if (nextIndex < state.currentQuiz.questions.length) {
            set({ 
              currentQuestionIndex: nextIndex,
              showFeedback: false 
            });
          } else if (state.mode !== QuizMode.PRACTICE) {
            // Test modunda quiz'i bitir
            get().completeQuiz();
          }
        },

        previousQuestion: () => {
          const state = get();
          if (state.currentQuestionIndex > 0) {
            set({ 
              currentQuestionIndex: state.currentQuestionIndex - 1,
              showFeedback: false 
            });
          }
        },

        goToQuestion: (index) => {
          const state = get();
          if (!state.currentQuiz || index < 0 || index >= state.currentQuiz.questions.length) return;
          
          set({ 
            currentQuestionIndex: index,
            showFeedback: false 
          });
        },

        completeQuiz: () => {
          const state = get();
          if (!state.currentQuiz || !state.isQuizActive) return;

          const timeSpent = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
          
          // Calculate correct answers
          let correctAnswers = 0;
          state.currentQuiz.questions.forEach((question, index) => {
            if (state.userAnswers[index] === question.correct) {
              correctAnswers++;
            }
          });

          const results: QuizResults = {
            quizId: state.currentQuiz.id,
            score: state.score,
            totalQuestions: state.currentQuiz.questions.length,
            correctAnswers,
            incorrectAnswers: state.currentQuiz.questions.length - correctAnswers,
            timeSpent,
            answers: state.userAnswers as (number | boolean)[],
            pointsEarned: state.score,
            streakBonus: 0 // TODO: Calculate streak bonus
          };

          // Review modunda yanlış soruları topla
          if (state.mode === QuizMode.TEST) {
            const wrongQuestions = state.currentQuiz.questions.filter(
              (question, index) => state.userAnswers[index] !== question.correct
            );
            set({ reviewQuestions: wrongQuestions });
          }

          set({
            isQuizActive: false,
            results,
            showFeedback: false
          });
        },

        resetQuiz: () => set({
          currentQuiz: null,
          currentQuestionIndex: 0,
          userAnswers: [],
          score: 0,
          streak: 0,
          isQuizActive: false,
          showFeedback: false,
          lastAnswerCorrect: false,
          startTime: null,
          results: null
        }),

        setReviewQuestions: (questions) => set({ reviewQuestions: questions }),

        toggleFeedback: (show) => set({ showFeedback: show })
      }),
      {
        name: 'quiz-store',
        partialize: (state) => ({ 
          mode: state.mode,
          reviewQuestions: state.reviewQuestions 
        })
      }
    )
  )
); 