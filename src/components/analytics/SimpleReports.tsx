'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Share2, Eye, 
  TrendingUp, TrendingDown, Minus,
  Lightbulb, Target, Clock, Award,
  BookOpen, Zap, Activity, Star
} from 'lucide-react';
import { UserPerformance, SubjectPerformance } from '../../services/analyticsService';
import { 
  generateInsights, 
  getStudyRecommendations,
  generatePerformanceSummary,
  formatTime,
  getPerformanceGrade
} from '../../utils/analytics';

interface SimpleReportsProps {
  userPerformance?: UserPerformance;
  subjectPerformance?: SubjectPerformance[];
  isLoading?: boolean;
  className?: string;
}

type ReportType = 'insights' | 'recommendations' | 'summary' | 'export';

export function SimpleReports({ 
  userPerformance, 
  subjectPerformance = [],
  isLoading = false,
  className = '' 
}: SimpleReportsProps) {
  const [activeReport, setActiveReport] = useState<ReportType>('insights');
  const [isExporting, setIsExporting] = useState(false);

  const insights = userPerformance && subjectPerformance.length > 0 
    ? generateInsights(userPerformance, subjectPerformance)
    : [];

  const recommendations = userPerformance && subjectPerformance.length > 0
    ? getStudyRecommendations(userPerformance, subjectPerformance)
    : [];

  const performanceSummary = userPerformance 
    ? generatePerformanceSummary(userPerformance)
    : null;

  const performanceGrade = userPerformance 
    ? getPerformanceGrade(userPerformance.averageScore)
    : null;

  const handleExport = async (format: 'json' | 'csv' | 'pdf') => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would call the analytics service
      console.log(`Exporting as ${format}...`);
      
      // Show success message
      alert(`${format.toUpperCase()} formatında rapor indirildi!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Rapor indirme başarısız oldu.');
    } finally {
      setIsExporting(false);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-8 bg-white/20 rounded w-20"></div>
            <div className="h-8 bg-white/20 rounded w-20"></div>
            <div className="h-8 bg-white/20 rounded w-20"></div>
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
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
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Raporlar & Öneriler</h3>
            <p className="text-gray-300 text-sm">Performans analizi ve tavsiyeler</p>
          </div>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'insights' as ReportType, icon: Lightbulb, label: 'İçgörüler' },
          { key: 'recommendations' as ReportType, icon: Target, label: 'Öneriler' },
          { key: 'summary' as ReportType, icon: Eye, label: 'Özet' },
          { key: 'export' as ReportType, icon: Download, label: 'İndir' }
        ].map(({ key, icon: Icon, label }) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveReport(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeReport === key
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Report Content */}
      <div className="min-h-[400px]">
        {activeReport === 'insights' && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span>Performans İçgörüleri</span>
            </h4>
            
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">{insight}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-300 py-8">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz içgörü yok</p>
                <p className="text-sm">Daha fazla quiz çözdükten sonra burada görünecek</p>
              </div>
            )}
          </div>
        )}

        {activeReport === 'recommendations' && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>Çalışma Önerileri</span>
            </h4>
            
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      recommendation.priority === 'high' 
                        ? 'bg-gradient-to-r from-red-400 to-pink-500'
                        : recommendation.priority === 'medium'
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-green-400 to-emerald-500'
                    }`}>
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium mb-1">{recommendation.title}</h5>
                      <p className="text-gray-300 text-sm mb-2">{recommendation.description}</p>
                      <div className="space-y-1">
                        {recommendation.actionItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300 text-xs">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-300 py-8">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz öneri yok</p>
                <p className="text-sm">Performans verilerin analiz edildikten sonra öneriler burada görünecek</p>
              </div>
            )}
          </div>
        )}

        {activeReport === 'summary' && (
          <div className="space-y-6">
            <h4 className="text-white font-semibold flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-400" />
              <span>Performans Özeti</span>
            </h4>
            
            {performanceSummary ? (
              <>
                {/* Overall Status */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: performanceSummary.color }}
                    />
                    <h5 className="text-white font-medium">Genel Durum</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{performanceSummary.message}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs">Toplam Quiz</p>
                        <p className="text-white font-semibold">{userPerformance?.totalQuizzes || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs">Ortalama Skor</p>
                        <p className="text-white font-semibold">{userPerformance?.averageScore || 0}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs">Toplam Süre</p>
                        <p className="text-white font-semibold">{formatTime(userPerformance?.totalTimeSpent || 0)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs">İyileşme Oranı</p>
                        <p className="text-white font-semibold">{userPerformance?.improvementRate || 0}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Grade */}
                {performanceGrade && (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Performans Seviyesi</span>
                      <div className="flex items-center space-x-2">
                        <span 
                          className="text-lg font-bold"
                          style={{ color: performanceGrade.color }}
                        >
                          {performanceGrade.grade}
                        </span>
                        <span className="text-gray-300 text-sm">-</span>
                        <span className="text-gray-300 text-sm">{performanceGrade.description}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-300 py-8">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz performans verisi yok</p>
                <p className="text-sm">İlk quiz'ini çözdükten sonra özet burada görünecek</p>
              </div>
            )}
          </div>
        )}

        {activeReport === 'export' && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center space-x-2">
              <Download className="w-5 h-5 text-green-400" />
              <span>Rapor İndir</span>
            </h4>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { format: 'json' as const, label: 'JSON Format', description: 'Yapılandırılmış veri formatı', icon: FileText },
                { format: 'csv' as const, label: 'CSV Format', description: 'Excel uyumlu tablo formatı', icon: FileText },
                { format: 'pdf' as const, label: 'PDF Format', description: 'Yazdırılabilir belge formatı', icon: FileText }
              ].map(({ format, label, description, icon: Icon }) => (
                <motion.button
                  key={format}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExport(format)}
                  disabled={isExporting}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h5 className="text-white font-medium">{label}</h5>
                      <p className="text-gray-300 text-sm">{description}</p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>

            {isExporting && (
              <div className="text-center text-gray-300 py-4">
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                <p>Rapor hazırlanıyor...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
} 