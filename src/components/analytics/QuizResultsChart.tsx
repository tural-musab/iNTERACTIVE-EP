'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, BarChart3, PieChart as PieChartIcon, 
  Activity, Calendar, Target
} from 'lucide-react';
import { WeeklyProgress, SubjectPerformance } from '../../services/analyticsService';
import { getWeekLabel, formatTime } from '../../utils/analytics';

interface QuizResultsChartProps {
  weeklyProgress?: WeeklyProgress[];
  subjectPerformance?: SubjectPerformance[];
  isLoading?: boolean;
  className?: string;
}

type ChartType = 'line' | 'bar' | 'pie' | 'area';

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
];

export function QuizResultsChart({ 
  weeklyProgress = [], 
  subjectPerformance = [],
  isLoading = false,
  className = '' 
}: QuizResultsChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [selectedMetric, setSelectedMetric] = useState<'score' | 'quizzes' | 'time'>('score');

  // Transform data for charts
  const lineChartData = weeklyProgress.map(week => ({
    week: getWeekLabel(week.week),
    score: week.averageScore,
    quizzes: week.quizzesCompleted,
    time: week.timeSpent,
    improvement: week.improvement
  }));

  const barChartData = subjectPerformance.map(subject => ({
    subject: subject.subject,
    score: subject.averageScore,
    quizzes: subject.totalQuizzes,
    time: subject.totalTimeSpent,
    easy: subject.difficultyBreakdown.easy,
    medium: subject.difficultyBreakdown.medium,
    hard: subject.difficultyBreakdown.hard
  }));

  const pieChartData = subjectPerformance.map((subject, index) => ({
    name: subject.subject,
    value: subject.totalQuizzes,
    color: COLORS[index % COLORS.length]
  }));

  const areaChartData = weeklyProgress.map(week => ({
    week: getWeekLabel(week.week),
    score: week.averageScore,
    quizzes: week.quizzesCompleted,
    time: week.timeSpent
  }));

  const getChartTitle = () => {
    switch (chartType) {
      case 'line':
        return 'Haftalık İlerleme';
      case 'bar':
        return 'Ders Performansı';
      case 'pie':
        return 'Ders Dağılımı';
      case 'area':
        return 'Zaman İçinde Gelişim';
      default:
        return 'Quiz Sonuçları';
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'score':
        return 'Ortalama Skor (%)';
      case 'quizzes':
        return 'Quiz Sayısı';
      case 'time':
        return 'Süre (dakika)';
      default:
        return 'Metrik';
    }
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse">
          <div className="h-64 bg-white/10 rounded-2xl"></div>
        </div>
      );
    }

    if (weeklyProgress.length === 0 && subjectPerformance.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Henüz veri yok</p>
            <p className="text-sm">Quiz çözdükten sonra grafikler burada görünecek</p>
          </div>
        </div>
      );
    }

    const data = chartType === 'line' || chartType === 'area' ? lineChartData : 
                 chartType === 'bar' ? barChartData : pieChartData;

    const renderChartContent = () => {
      switch (chartType) {
        case 'line':
          return (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="week" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          );

        case 'bar':
          return (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="subject" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar 
                dataKey={selectedMetric} 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          );

        case 'pie':
          return (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          );

        case 'area':
          return (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="week" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Area 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3B82F6" 
                fill="rgba(59, 130, 246, 0.3)"
                strokeWidth={2}
              />
            </AreaChart>
          );

        default:
          return null;
      }
    };

    return (
      <ResponsiveContainer width="100%" height={300}>
        {renderChartContent()}
      </ResponsiveContainer>
    );
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
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{getChartTitle()}</h3>
            <p className="text-gray-300 text-sm">{getMetricLabel()}</p>
          </div>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { type: 'line' as ChartType, icon: TrendingUp, label: 'Çizgi' },
          { type: 'bar' as ChartType, icon: BarChart3, label: 'Sütun' },
          { type: 'pie' as ChartType, icon: PieChartIcon, label: 'Pasta' },
          { type: 'area' as ChartType, icon: Activity, label: 'Alan' }
        ].map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType(type)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              chartType === type
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Metric Selector (for line and bar charts) */}
      {(chartType === 'line' || chartType === 'bar' || chartType === 'area') && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'score' as const, label: 'Skor', icon: Target },
            { key: 'quizzes' as const, label: 'Quiz Sayısı', icon: BarChart3 },
            { key: 'time' as const, label: 'Süre', icon: Calendar }
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMetric(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedMetric === key
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Chart Container */}
      <div className="relative">
        {renderChart()}
      </div>

      {/* Chart Info */}
      {!isLoading && (weeklyProgress.length > 0 || subjectPerformance.length > 0) && (
        <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-300 text-sm">Toplam Veri</p>
              <p className="text-white font-semibold">
                {chartType === 'line' || chartType === 'area' 
                  ? `${weeklyProgress.length} hafta`
                  : `${subjectPerformance.length} ders`
                }
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">En Yüksek</p>
              <p className="text-white font-semibold">
                {chartType === 'line' || chartType === 'area'
                  ? `${Math.max(...weeklyProgress.map(w => w.averageScore))}%`
                  : `${Math.max(...subjectPerformance.map(s => s.averageScore))}%`
                }
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Ortalama</p>
              <p className="text-white font-semibold">
                {chartType === 'line' || chartType === 'area'
                  ? `${(weeklyProgress.reduce((sum, w) => sum + w.averageScore, 0) / weeklyProgress.length).toFixed(1)}%`
                  : `${(subjectPerformance.reduce((sum, s) => sum + s.averageScore, 0) / subjectPerformance.length).toFixed(1)}%`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
