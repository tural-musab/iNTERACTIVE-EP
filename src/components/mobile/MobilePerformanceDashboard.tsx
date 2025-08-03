'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Battery, Wifi, WifiOff, Smartphone, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Zap, Cpu, HardDrive, Network, Gauge, Thermometer, XCircle
} from 'lucide-react';
import { useMobilePerformance, useMobileCapabilities, useMobileGestures } from '../../hooks/useMobilePerformance';

interface MobilePerformanceDashboardProps {
  className?: string;
  showAdvanced?: boolean;
}

export function MobilePerformanceDashboard({ 
  className = '',
  showAdvanced = false 
}: MobilePerformanceDashboardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getOptimizationSuggestions,
    getPerformanceScore
  } = useMobilePerformance({
    enableFPSMonitoring: true,
    enableMemoryMonitoring: true,
    enableBatteryMonitoring: true,
    enableNetworkMonitoring: true,
    updateInterval: 2000
  });

  const capabilities = useMobileCapabilities();
  const gestures = useMobileGestures();

  const performanceScore = getPerformanceScore();
  const suggestions = getOptimizationSuggestions();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  useEffect(() => {
    // Auto-start monitoring when component mounts
    if (!isMonitoring) {
      startMonitoring();
    }
  }, [isMonitoring, startMonitoring]);

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mobil Performans</h3>
              <p className="text-gray-300 text-sm">Gerçek zamanlı sistem durumu</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrendingDown className="w-4 h-4 text-white" />
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                isMonitoring
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isMonitoring ? 'Durdur' : 'Başlat'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Performance Score */}
      <div className="p-6">
        <div className={`p-4 rounded-2xl border ${getScoreBackground(performanceScore)}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold">Performans Skoru</h4>
            <span className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
              {performanceScore}/100
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
            <motion.div
              className={`h-3 rounded-full ${
                performanceScore >= 80 ? 'bg-green-500' :
                performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${performanceScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {performanceScore >= 80 ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            )}
            <span className="text-gray-300 text-sm">
              {performanceScore >= 80 ? 'Mükemmel performans' :
               performanceScore >= 60 ? 'İyi performans' : 'Performans iyileştirmesi gerekli'}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* FPS */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 text-xs">FPS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${
                metrics.fps >= 50 ? 'text-green-400' :
                metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.fps}
              </span>
              {metrics.fps >= 50 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>

          {/* Memory */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-xs">Bellek</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${
                metrics.memoryUsage < 50 ? 'text-green-400' :
                metrics.memoryUsage < 100 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.memoryUsage}MB
              </span>
              {metrics.memoryUsage < 50 ? (
                <TrendingDown className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>

          {/* Battery */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Battery className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-xs">Pil</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${
                metrics.batteryLevel && metrics.batteryLevel > 50 ? 'text-green-400' :
                metrics.batteryLevel && metrics.batteryLevel > 20 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.batteryLevel ? `${metrics.batteryLevel}%` : 'N/A'}
              </span>
              {metrics.batteryLevel && metrics.batteryLevel > 50 ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
              )}
            </div>
          </div>

          {/* Network */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              {metrics.isOnline ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className="text-gray-300 text-xs">Ağ</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${
                metrics.isOnline ? 'text-green-400' : 'text-red-400'
              }`}>
                {metrics.isOnline ? 'Online' : 'Offline'}
              </span>
              {metrics.isOnline ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10"
          >
            <div className="p-6 space-y-6">
              {/* Device Capabilities */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Cihaz Özellikleri</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(capabilities).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )
                      ) : (
                        <span className="text-blue-400 text-xs">{value}</span>
                      )}
                      <span className="text-gray-300 text-xs capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gesture Detection */}
              <div>
                <h4 className="text-white font-semibold mb-3">Hareket Algılama</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <div className="text-gray-300 text-xs mb-1">Pinch</div>
                    <div className={`text-sm font-medium ${gestures.isPinching ? 'text-green-400' : 'text-gray-400'}`}>
                      {gestures.isPinching ? 'Aktif' : 'Pasif'}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <div className="text-gray-300 text-xs mb-1">Rotate</div>
                    <div className={`text-sm font-medium ${gestures.isRotating ? 'text-green-400' : 'text-gray-400'}`}>
                      {gestures.isRotating ? 'Aktif' : 'Pasif'}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <div className="text-gray-300 text-xs mb-1">Shake</div>
                    <div className={`text-sm font-medium ${gestures.isShaking ? 'text-green-400' : 'text-gray-400'}`}>
                      {gestures.isShaking ? 'Aktif' : 'Pasif'}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <div className="text-gray-300 text-xs mb-1">Scale</div>
                    <div className="text-sm font-medium text-blue-400">
                      {gestures.pinchScale.toFixed(2)}x
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimization Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span>Optimizasyon Önerileri</span>
                  </h4>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                      >
                        <p className="text-yellow-300 text-sm">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Metrics */}
              <div>
                <h4 className="text-white font-semibold mb-3">Detaylı Metrikler</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Yükleme Süresi</span>
                      <span className="text-white font-mono">{Math.round(metrics.loadTime)}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Ağ Tipi</span>
                      <span className="text-white font-mono">{metrics.networkType || 'Bilinmiyor'}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Piksel Oranı</span>
                      <span className="text-white font-mono">{capabilities.devicePixelRatio}x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Dokunma Noktası</span>
                      <span className="text-white font-mono">{capabilities.maxTouchPoints}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 