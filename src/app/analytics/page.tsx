'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BarChart3, TrendingUp, Target, 
  Clock, BookOpen, Award, Activity
} from 'lucide-react';
import { useGamificationStore } from '@/stores/gamificationStore';
import { 
  getUserPerformance, 
  getSubjectPerformance, 
  getWeeklyProgress,
  UserPerformance,
  SubjectPerformance,
  WeeklyProgress
} from '@/services/analyticsService';
import { StudentPerformanceCard } from '@/components/analytics/StudentPerformanceCard';
import { QuizResultsChart } from '@/components/analytics/QuizResultsChart';
import { ProgressOverview } from '@/components/analytics/ProgressOverview';
import { SimpleReports } from '@/components/analytics/SimpleReports';

export default function AnalyticsPage() {
  const router = useRouter();
  const { userStats, totalXP, level, currentStreak, earnedBadgeIds } = useGamificationStore();
  
  const [userPerformance, setUserPerformance] = useState<UserPerformance | null>(null);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Sample data for demonstration
  const samplePerformanceData = {
    totalQuizzes: 15,
    averageScore: 78.5,
    totalTimeSpent: 240, // minutes
    favoriteSubject: 'Matematik',
    improvementRate: 12.3,
    lastActivity: new Date(),
    consistency: 85,
    engagementScore: 72
  };

  const sampleSubjectData = [
    {
      subject: 'Matematik',
      totalQuizzes: 6,
      averageScore: 85.2,
      totalTimeSpent: 90,
      difficultyBreakdown: { easy: 2, medium: 3, hard: 1 },
      improvementRate: 15.5,
      lastQuizDate: new Date()
    },
    {
      subject: 'Fen Bilgisi',
      totalQuizzes: 5,
      averageScore: 72.8,
      totalTimeSpent: 75,
      difficultyBreakdown: { easy: 1, medium: 3, hard: 1 },
      improvementRate: 8.2,
      lastQuizDate: new Date()
    },
    {
      subject: 'Türkçe',
      totalQuizzes: 4,
      averageScore: 81.5,
      totalTimeSpent: 60,
      difficultyBreakdown: { easy: 2, medium: 2, hard: 0 },
      improvementRate: 18.7,
      lastQuizDate: new Date()
    }
  ];

  const sampleWeeklyData = [
    {
      week: '2024-01-01',
      quizzesCompleted: 3,
      averageScore: 75.0,
      timeSpent: 45,
      improvement: 5.2,
      subjects: ['Matematik', 'Fen Bilgisi']
    },
    {
      week: '2024-01-08',
      quizzesCompleted: 4,
      averageScore: 78.5,
      timeSpent: 60,
      improvement: 8.1,
      subjects: ['Matematik', 'Türkçe', 'Fen Bilgisi']
    },
    {
      week: '2024-01-15',
      quizzesCompleted: 5,
      averageScore: 82.3,
      timeSpent: 75,
      improvement: 12.4,
      subjects: ['Matematik', 'Fen Bilgisi', 'Türkçe']
    },
    {
      week: '2024-01-22',
      quizzesCompleted: 3,
      averageScore: 79.8,
      timeSpent: 60,
      improvement: 15.7,
      subjects: ['Matematik', 'Türkçe']
    }
  ];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would get the user ID from auth
        const mockUserId = 'user-123';
        setUserId(mockUserId);

        // For now, use sample data
        // In production, you would call:
        // const performance = await getUserPerformance(mockUserId);
        // const subjects = await getSubjectPerformance(mockUserId);
        // const weekly = await getWeeklyProgress(mockUserId);

        setUserPerformance({
          userId: mockUserId,
          ...samplePerformanceData
        });
        setSubjectPerformance(sampleSubjectData);
        setWeeklyProgress(sampleWeeklyData);

      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleBackToDashboard = () => {
    router.push('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToDashboard}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics & Raporlar</h1>
                <p className="text-gray-300">Performans analizi ve detaylı raporlar</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Toplam Quiz</p>
                    <p className="text-white font-bold">{userStats?.totalQuizzesCompleted || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Başarı Oranı</p>
                    <p className="text-white font-bold">{userStats?.averageAccuracy ? Math.round(userStats.averageAccuracy) : 0}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Toplam Süre</p>
                    <p className="text-white font-bold">{userStats?.totalTimeSpent ? Math.round(userStats.totalTimeSpent / 60) : 0} dk</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Kazanılan Rozet</p>
                    <p className="text-white font-bold">{earnedBadgeIds?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StudentPerformanceCard
                  userId={userId || ''}
                  performance={userPerformance || undefined}
                  isLoading={isLoading}
                />
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ProgressOverview
                  weeklyProgress={weeklyProgress}
                  subjectPerformance={subjectPerformance}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quiz Results Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuizResultsChart
                  weeklyProgress={weeklyProgress}
                  subjectPerformance={subjectPerformance}
                  isLoading={isLoading}
                />
              </motion.div>

              {/* Simple Reports */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SimpleReports
                  userPerformance={userPerformance || undefined}
                  subjectPerformance={subjectPerformance}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>
          </div>

          {/* Gamification Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Toplam XP</p>
                  <p className="text-2xl font-bold text-white">{totalXP || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Seviye</p>
                  <p className="text-2xl font-bold text-white">{level || 1}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Günlük Seri</p>
                  <p className="text-2xl font-bold text-white">{currentStreak || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Rozetler</p>
                  <p className="text-2xl font-bold text-white">{earnedBadgeIds?.length || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
} 