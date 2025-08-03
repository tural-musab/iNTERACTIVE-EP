'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, TrendingUp, TrendingDown, Minus, 
  Clock, Target, BookOpen, Award, Zap, Activity
} from 'lucide-react';
import { WeeklyProgress, SubjectPerformance } from '../../services/analyticsService';
import { 
  getWeekLabel, 
  formatTime, 
  calculatePercentageChange,
  getTrendDirection 
} from '../../utils/analytics';

interface ProgressOverviewProps {
  weeklyProgress?: WeeklyProgress[];
  subjectPerformance?: SubjectPerformance[];
  isLoading?: boolean;
  className?: string;
}

type TimeRange = 'week' | 'month' | 'quarter';

export function ProgressOverview({ 
  weeklyProgress = [], 
  subjectPerformance = [],
  isLoading = false,
  className = '' 
}: ProgressOverviewProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Filter data based on time range
  const getFilteredData = () => {
    if (timeRange === 'week') {
      return weeklyProgress.slice(-4); // Last 4 weeks
    } else if (timeRange === 'month') {
      return weeklyProgress.slice(-8); // Last 8 weeks
    } else {
      return weeklyProgress; // All data
    }
  };

  const filteredProgress = getFilteredData();
  const filteredSubjects = selectedSubject === 'all' 
    ? subjectPerformance 
    : subjectPerformance.filter(s => s.subject === selectedSubject);

  // Calculate trends
  const calculateTrends = () => {
    if (filteredProgress.length < 2) {
      return {
        scoreTrend: 0,
        quizTrend: 0,
        timeTrend: 0,
        overallTrend: 0
      };
    }

    const recent = filteredProgress.slice(-2);
    const older = filteredProgress.slice(-4, -2);

    const recentAvgScore = recent.reduce((sum, w) => sum + w.averageScore, 0) / recent.length;
    const olderAvgScore = older.reduce((sum, w) => sum + w.averageScore, 0) / older.length;
    
    const recentAvgQuizzes = recent.reduce((sum, w) => sum + w.quizzesCompleted, 0) / recent.length;
    const olderAvgQuizzes = older.reduce((sum, w) => sum + w.quizzesCompleted, 0) / older.length;
    
    const recentAvgTime = recent.reduce((sum, w) => sum + w.timeSpent, 0) / recent.length;
    const olderAvgTime = older.reduce((sum, w) => sum + w.timeSpent, 0) / older.length;

    return {
      scoreTrend: calculatePercentageChange(olderAvgScore, recentAvgScore),
      quizTrend: calculatePercentageChange(olderAvgQuizzes, recentAvgQuizzes),
      timeTrend: calculatePercentageChange(olderAvgTime, recentAvgTime),
      overallTrend: (recentAvgScore + recentAvgQuizzes * 10 + recentAvgTime / 10) - 
                   (olderAvgScore + olderAvgQuizzes * 10 + olderAvgTime / 10)
    };
  };

  const trends = calculateTrends();

  const getTrendIcon = (trend: number) => {
    const direction = getTrendDirection(trend);
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: number) => {
    const direction = getTrendDirection(trend);
    switch (direction) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'week':
        return 'Son 4 Hafta';
      case 'month':
        return 'Son 2 Ay';
      case 'quarter':
        return 'Tüm Süre';
      default:
        return 'İlerleme';
    }
  };

  // Calculate summary stats
  const getSummaryStats = () => {
    if (filteredProgress.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTime: 0,
        improvement: 0
      };
    }

    const totalQuizzes = filteredProgress.reduce((sum, w) => sum + w.quizzesCompleted, 0);
    const averageScore = filteredProgress.reduce((sum, w) => sum + w.averageScore, 0) / filteredProgress.length;
    const totalTime = filteredProgress.reduce((sum, w) => sum + w.timeSpent, 0);
    const improvement = filteredProgress[filteredProgress.length - 1]?.improvement || 0;

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore * 100) / 100,
      totalTime,
      improvement
    };
  };

  const summaryStats = getSummaryStats();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-4 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">İlerleme Özeti</h3>
            <p className="text-gray-300 text-sm">{getTimeRangeLabel()}</p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'week' as TimeRange, label: '4 Hafta' },
          { key: 'month' as TimeRange, label: '2 Ay' },
          { key: 'quarter' as TimeRange, label: 'Tümü' }
        ].map(({ key, label }) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeRange(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              timeRange === key
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Subject Filter */}
      {subjectPerformance.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
              selectedSubject === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Tüm Dersler
          </motion.button>
          {subjectPerformance.map(subject => (
            <motion.button
              key={subject.subject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubject(subject.subject)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedSubject === subject.subject
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {subject.subject}
            </motion.button>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Toplam Quiz</p>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">{summaryStats.totalQuizzes}</span>
                {getTrendIcon(trends.quizTrend)}
              </div>
            </div>
          </div>
          <div className={`text-xs ${getTrendColor(trends.quizTrend)}`}>
            {trends.quizTrend > 0 ? '+' : ''}{trends.quizTrend.toFixed(1)}% değişim
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Ortalama Skor</p>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">{summaryStats.averageScore}%</span>
                {getTrendIcon(trends.scoreTrend)}
              </div>
            </div>
          </div>
          <div className={`text-xs ${getTrendColor(trends.scoreTrend)}`}>
            {trends.scoreTrend > 0 ? '+' : ''}{trends.scoreTrend.toFixed(1)}% değişim
          </div>
        </motion.div>

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
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">{formatTime(summaryStats.totalTime)}</span>
                {getTrendIcon(trends.timeTrend)}
              </div>
            </div>
          </div>
          <div className={`text-xs ${getTrendColor(trends.timeTrend)}`}>
            {trends.timeTrend > 0 ? '+' : ''}{trends.timeTrend.toFixed(1)}% değişim
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-xs">Genel İyileşme</p>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">{summaryStats.improvement.toFixed(1)}%</span>
                {getTrendIcon(trends.overallTrend)}
              </div>
            </div>
          </div>
          <div className={`text-xs ${getTrendColor(trends.overallTrend)}`}>
            {trends.overallTrend > 0 ? '+' : ''}{trends.overallTrend.toFixed(1)} puan
          </div>
        </motion.div>
      </div>

      {/* Recent Progress Timeline */}
      {filteredProgress.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Son İlerleme</span>
          </h4>
          <div className="space-y-3">
            {filteredProgress.slice(-3).reverse().map((week, index) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{getWeekLabel(week.week)}</p>
                    <p className="text-gray-400 text-xs">
                      {week.quizzesCompleted} quiz • {formatTime(week.timeSpent)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{week.averageScore}%</p>
                  <p className={`text-xs ${week.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {week.improvement > 0 ? '+' : ''}{week.improvement}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Subject Performance Summary */}
      {filteredSubjects.length > 0 && (
        <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Ders Performansı</span>
          </h4>
          <div className="space-y-3">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.subject}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div>
                  <p className="text-white font-medium">{subject.subject}</p>
                  <p className="text-gray-400 text-xs">
                    {subject.totalQuizzes} quiz • {formatTime(subject.totalTimeSpent)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{subject.averageScore}%</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">
                      {subject.difficultyBreakdown.easy} kolay
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProgress.length === 0 && (
        <div className="text-center text-gray-300 py-8">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Henüz ilerleme verisi yok</p>
          <p className="text-sm">Quiz çözmeye başladığında burada görünecek</p>
        </div>
      )}
    </motion.div>
  );
}
