'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Minus, Target, Clock, 
  Award, BookOpen, Zap, Star, Activity
} from 'lucide-react';
import { UserPerformance } from '../../services/analyticsService';
import { 
  getPerformanceGrade, 
  formatTime, 
  generatePerformanceSummary,
  calculateEngagementScore 
} from '../../utils/analytics';

interface StudentPerformanceCardProps {
  userId: string;
  performance?: UserPerformance;
  isLoading?: boolean;
  className?: string;
}

export function StudentPerformanceCard({ 
  userId, 
  performance, 
  isLoading = false,
  className = '' 
}: StudentPerformanceCardProps) {
  const [localPerformance, setLocalPerformance] = useState<UserPerformance | null>(performance || null);

  useEffect(() => {
    if (performance) {
      setLocalPerformance(performance);
    }
  }, [performance]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!localPerformance) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
      >
        <div className="text-center text-gray-300">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Henüz performans verisi yok</p>
          <p className="text-sm">İlk quiz'ini çözdükten sonra burada görünecek</p>
        </div>
      </motion.div>
    );
  }

  const {
    totalQuizzes,
    averageScore,
    totalTimeSpent,
    favoriteSubject,
    improvementRate,
    lastActivity
  } = localPerformance;

  const performanceGrade = getPerformanceGrade(averageScore);
  const performanceSummary = generatePerformanceSummary(localPerformance);
  const engagementScore = calculateEngagementScore(
    totalQuizzes,
    totalTimeSpent / Math.max(totalQuizzes, 1),
    85, // Placeholder consistency
    improvementRate
  );

  const getTrendIcon = (rate: number) => {
    if (rate > 5) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (rate < -5) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (rate: number) => {
    if (rate > 5) return 'text-green-400';
    if (rate < -5) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Performans Özeti</h3>
            <p className="text-gray-300 text-sm">Genel başarı durumun</p>
          </div>
        </div>
        <div 
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{ 
            backgroundColor: `${performanceGrade.color}20`, 
            color: performanceGrade.color,
            border: `1px solid ${performanceGrade.color}40`
          }}
        >
          {performanceGrade.grade}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex items-center space-x-3 mb-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: performanceSummary.color }}
          />
          <h4 className="text-white font-semibold">Genel Durum</h4>
        </div>
        <p className="text-gray-300 text-sm">{performanceSummary.message}</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Average Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Ortalama Skor</p>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">{averageScore}%</span>
                {getTrendIcon(improvementRate)}
              </div>
            </div>
          </div>
          <div className={`text-xs ${getTrendColor(improvementRate)}`}>
            {improvementRate > 0 ? '+' : ''}{improvementRate}% değişim
          </div>
        </motion.div>

        {/* Total Quizzes */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Toplam Quiz</p>
              <span className="text-xl font-bold text-white">{totalQuizzes}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Son aktivite: {lastActivity.toLocaleDateString('tr-TR')}
          </div>
        </motion.div>

        {/* Total Time */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Toplam Süre</p>
              <span className="text-xl font-bold text-white">{formatTime(totalTimeSpent)}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Ortalama: {formatTime(totalTimeSpent / Math.max(totalQuizzes, 1))}
          </div>
        </motion.div>

        {/* Engagement Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Katılım Puanı</p>
              <span className="text-xl font-bold text-white">{engagementScore}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {engagementScore >= 80 ? 'Mükemmel' : engagementScore >= 60 ? 'İyi' : 'Geliştirilmeli'}
          </div>
        </motion.div>
      </div>

      {/* Favorite Subject */}
      {favoriteSubject && (
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-violet-500 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">En İyi Dersin</p>
              <p className="text-white font-semibold">{favoriteSubject}</p>
            </div>
          </div>
        </div>
      )}

      {/* Performance Grade Details */}
      <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Performans Seviyesi</span>
          <div className="flex items-center space-x-2">
            <span 
              className="text-sm font-semibold"
              style={{ color: performanceGrade.color }}
            >
              {performanceGrade.grade}
            </span>
            <span className="text-gray-400 text-sm">-</span>
            <span className="text-gray-300 text-sm">{performanceGrade.description}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
