'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, Target, Brain, RotateCcw, 
  BookOpen, Clock, Award, TrendingUp, Zap
} from 'lucide-react';
import { QuizModeSelector, QuizMode } from '@/components/quiz/QuizModeSelector';
import { StepByStepQuiz } from '@/components/quiz/StepByStepQuiz';
import { useQuizStore } from '@/stores/quizStore';
import { useGamificationStore } from '@/stores/gamificationStore';
import supabase from '@/lib/supabaseClient';

// Örnek quiz verisi
const sampleQuiz = {
  id: 'sample-quiz-1',
  title: 'Matematik - Kesirler',
  subject: 'Matematik',
  grade: 5,
  questions: [
    {
      id: 1,
      question: '\\frac{3}{4} + \\frac{1}{4} = ?',
      type: 'multiple_choice' as const,
      options: ['\\frac{1}{2}', '\\frac{4}{4}', '1', '\\frac{2}{4}'],
      correct: 2,
      points: 10,
      explanation: '\\frac{3}{4} + \\frac{1}{4} = \\frac{4}{4} = 1',
      difficulty: 'easy' as const
    },
    {
      id: 2,
      question: '\\frac{2}{3} \\times \\frac{3}{4} = ?',
      type: 'multiple_choice' as const,
      options: ['\\frac{6}{12}', '\\frac{1}{2}', '\\frac{6}{7}', '\\frac{5}{7}'],
      correct: 1,
      points: 10,
      explanation: '\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}',
      difficulty: 'medium' as const
    },
    {
      id: 3,
      question: '\\frac{5}{6} - \\frac{1}{3} = ?',
      type: 'multiple_choice' as const,
      options: ['\\frac{4}{3}', '\\frac{1}{2}', '\\frac{3}{6}', '\\frac{2}{3}'],
      correct: 1,
      points: 10,
      explanation: '\\frac{5}{6} - \\frac{1}{3} = \\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}',
      difficulty: 'medium' as const
    }
  ],
  timeLimit: 10,
  passingScore: 2,
  totalPoints: 30
};

interface QuizResults {
  score: number;
  totalQuestions: number;
  answers: number[];
  timeSpent: number;
}

export default function QuizPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);
  
  const { setQuiz, setMode } = useQuizStore();
  const { addPoints } = useGamificationStore();

  const handleModeSelect = (mode: QuizMode) => {
    setSelectedMode(mode);
    setMode(mode);
    setQuiz(sampleQuiz);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleQuizComplete = async (quizResults: QuizResults) => {
    setResults(quizResults);
    setQuizCompleted(true);
    
    // Güvenli Edge Function çağrısı ile puan verme
    try {
      // Quiz attempt kaydı oluştur (bu kısım quiz sistemi tarafından yapılmalı)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('Kullanıcı bulunamadı');
        return;
      }

      // Quiz attempt kaydı oluştur
      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert({
          student_id: user.id,
          quiz_id: sampleQuiz.id,
          score: quizResults.score,
          total_questions: quizResults.totalQuestions,
          time_spent: quizResults.timeSpent,
          answers: quizResults.answers,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (attemptError) {
        console.error('Quiz attempt kaydı oluşturulamadı:', attemptError);
        return;
      }

      // Edge Function ile güvenli puan verme
      const { data, error } = await supabase.functions.invoke('award-quiz-points', {
        body: { 
          quiz_attempt_id: attemptData.id 
        }
      });

      if (error) {
        console.error("Puan verilirken hata oluştu:", error);
      } else {
        console.log("Başarılı:", data.message);
        // Gamification store'u güncelle (sadece UI için)
        const pointsEarned = quizResults.score * 10;
        await addPoints(pointsEarned, 'quiz_completion', {
          quizId: sampleQuiz.id,
          score: quizResults.score,
          totalQuestions: quizResults.totalQuestions,
          timeSpent: quizResults.timeSpent
        });
      }
    } catch (error) {
      console.error('Quiz tamamlama hatası:', error);
    }
  };

  const handleRetryQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setResults(null);
  };

  const handleBackToDashboard = () => {
    router.push('/student/dashboard');
  };

  // Quiz tamamlandığında sonuç sayfası
  if (quizCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">Quiz Tamamlandı!</span>
              </div>
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Dashboard&apos;a Dön</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Tebrikler!</h2>
              <p className="text-gray-300">Quiz&apos;i başarıyla tamamladın</p>
            </div>

            {/* Results Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Skor</p>
                    <p className="text-2xl font-bold text-white">{results.score}/{results.totalQuestions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Süre</p>
                    <p className="text-2xl font-bold text-white">{Math.round(results.timeSpent / 1000)}s</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Başarı Oranı</p>
                    <p className="text-2xl font-bold text-white">{Math.round((results.score / results.totalQuestions) * 100)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleRetryQuiz}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Tekrar Dene</span>
              </button>
              <button
                onClick={handleBackToDashboard}
                className="flex-1 bg-white/10 text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Dashboard&apos;a Dön
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz başladığında
  if (quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
        <StepByStepQuiz
          quiz={sampleQuiz}
          mode={selectedMode as QuizMode}
          onComplete={handleQuizComplete}
        />
      </div>
    );
  }

  // Ana quiz seçim sayfası
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">Quiz Merkezi</span>
            </div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Dashboard&apos;a Dön</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Mode Selection */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Quiz Modunu Seç</h1>
          <p className="text-xl text-gray-300">Öğrenme tarzına en uygun modu seç ve başla!</p>
        </div>

        <QuizModeSelector
          onModeSelect={handleModeSelect}
          selectedMode={selectedMode}
        />

        {/* Start Quiz Button */}
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              <Zap className="w-6 h-6" />
              <span>Quiz&apos;i Başlat</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 