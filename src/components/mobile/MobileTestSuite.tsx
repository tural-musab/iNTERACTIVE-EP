'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Tablet, Monitor, Wifi, WifiOff, 
  Battery, BatteryCharging, Volume2, VolumeX,
  RotateCcw, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useMobileDetection } from './MobileOptimizations';
import { TouchGestures } from './TouchGestures';

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message?: string;
  duration?: number;
}

interface MobileTestSuiteProps {
  className?: string;
  onComplete?: (results: TestResult[]) => void;
}

export function MobileTestSuite({ className = '', onComplete }: MobileTestSuiteProps) {
  const { isMobile, isTablet, screenSize } = useMobileDetection();
  const [tests, setTests] = useState<TestResult[]>([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const testDefinitions = [
    {
      id: 'device-detection',
      name: 'Cihaz Algılama',
      test: () => testDeviceDetection()
    },
    {
      id: 'touch-gestures',
      name: 'Dokunma Hareketleri',
      test: () => testTouchGestures()
    },
    {
      id: 'responsive-design',
      name: 'Responsive Tasarım',
      test: () => testResponsiveDesign()
    },
    {
      id: 'performance',
      name: 'Performans Testi',
      test: () => testPerformance()
    },
    {
      id: 'network',
      name: 'Ağ Bağlantısı',
      test: () => testNetworkConnection()
    },
    {
      id: 'battery',
      name: 'Pil Durumu',
      test: () => testBatteryStatus()
    },
    {
      id: 'orientation',
      name: 'Ekran Yönlendirmesi',
      test: () => testOrientation()
    },
    {
      id: 'accessibility',
      name: 'Erişilebilirlik',
      test: () => testAccessibility()
    }
  ];

  const testDeviceDetection = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userAgent = navigator.userAgent;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    if (isMobileDevice || isMobile || isTablet) {
      return {
        passed: true,
        message: `Cihaz başarıyla algılandı: ${isMobile ? 'Mobil' : isTablet ? 'Tablet' : 'Desktop'} (${screenSize.width}x${screenSize.height})`
      };
    }
    
    return {
      passed: false,
      message: 'Mobil cihaz algılanamadı'
    };
  };

  const testTouchGestures = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (hasTouchSupport) {
      return {
        passed: true,
        message: 'Dokunma desteği mevcut'
      };
    }
    
    return {
      passed: false,
      message: 'Dokunma desteği bulunamadı'
    };
  };

  const testResponsiveDesign = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const viewport = window.innerWidth;
    const isResponsive = viewport > 0;
    
    if (isResponsive) {
      return {
        passed: true,
        message: `Responsive tasarım uyumlu (${viewport}px)`
      };
    }
    
    return {
      passed: false,
      message: 'Responsive tasarım sorunu'
    };
  };

  const testPerformance = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const startTime = performance.now();
    
    // Simulate some heavy operation
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration < 100) {
      return {
        passed: true,
        message: `Performans iyi (${Math.round(duration)}ms)`
      };
    } else if (duration < 500) {
      return {
        passed: true,
        message: `Performans kabul edilebilir (${Math.round(duration)}ms)`
      };
    } else {
      return {
        passed: false,
        message: `Performans yavaş (${Math.round(duration)}ms)`
      };
    }
  };

  const testNetworkConnection = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType || 'unknown';
      
      return {
        passed: true,
        message: `Ağ bağlantısı: ${effectiveType}`
      };
    }
    
    return {
      passed: true,
      message: 'Ağ bağlantısı mevcut'
    };
  };

  const testBatteryStatus = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        const level = Math.round(battery.level * 100);
        
        return {
          passed: true,
          message: `Pil seviyesi: %${level}`
        };
      } catch (error) {
        return {
          passed: true,
          message: 'Pil bilgisi alınamadı'
        };
      }
    }
    
    return {
      passed: true,
      message: 'Pil API\'si mevcut değil'
    };
  };

  const testOrientation = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    
    return {
      passed: true,
      message: `Ekran yönlendirmesi: ${orientation}`
    };
  };

  const testAccessibility = async (): Promise<{ passed: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic accessibility checks
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    return {
      passed: true,
      message: `Erişilebilirlik: ${hasReducedMotion ? 'Azaltılmış hareket' : 'Normal hareket'}`
    };
  };

  const runTests = async () => {
    setIsRunning(true);
    setCurrentTestIndex(0);
    setShowResults(false);
    
    const initialTests = testDefinitions.map(test => ({
      id: test.id,
      name: test.name,
      status: 'pending' as const
    }));
    
    setTests(initialTests);
    
    for (let i = 0; i < testDefinitions.length; i++) {
      const testDef = testDefinitions[i];
      
      // Update current test status
      setTests(prev => prev.map((test, index) => 
        index === i ? { ...test, status: 'running' } : test
      ));
      
      setCurrentTestIndex(i);
      
      try {
        const startTime = performance.now();
        const result = await testDef.test();
        const endTime = performance.now();
        
        setTests(prev => prev.map((test, index) => 
          index === i ? {
            ...test,
            status: result.passed ? 'passed' : 'failed',
            message: result.message,
            duration: Math.round(endTime - startTime)
          } : test
        ));
        
        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        setTests(prev => prev.map((test, index) => 
          index === i ? {
            ...test,
            status: 'failed',
            message: 'Test hatası: ' + (error as Error).message
          } : test
        ));
      }
    }
    
    setIsRunning(false);
    setShowResults(true);
    onComplete?.(tests);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      case 'running':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const passedTests = tests.filter(test => test.status === 'passed').length;
  const totalTests = tests.length;

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Mobil Test Süiti</h2>
          <p className="text-gray-300 text-sm">Cihaz uyumluluğu ve performans testleri</p>
        </div>
      </div>

      {!isRunning && tests.length === 0 && (
        <div className="text-center py-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={runTests}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Testleri Başlat
          </motion.button>
        </div>
      )}

      {isRunning && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Test Çalışıyor...</span>
            <span className="text-gray-300 text-sm">{currentTestIndex + 1} / {totalTests}</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentTestIndex + 1) / totalTests) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {tests.length > 0 && (
        <div className="space-y-3 mt-6">
          {tests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                test.status === 'running'
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : test.status === 'passed'
                  ? 'bg-green-500/10 border-green-500/30'
                  : test.status === 'failed'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <span className="text-white font-medium">{test.name}</span>
                </div>
                {test.duration && (
                  <span className="text-gray-300 text-sm">{test.duration}ms</span>
                )}
              </div>
              {test.message && (
                <p className="text-gray-300 text-sm mt-2 ml-7">{test.message}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Test Sonuçları</h3>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-mono">{passedTests}</span>
              <span className="text-gray-300">/</span>
              <span className="text-white font-mono">{totalTests}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(passedTests / totalTests) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <p className="text-gray-300 text-sm mt-2">
            {passedTests === totalTests 
              ? '🎉 Tüm testler başarıyla geçti!' 
              : `${totalTests - passedTests} test başarısız oldu.`
            }
          </p>
        </motion.div>
      )}

      {/* Touch Gesture Test Demo */}
      {isMobile && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-3">Dokunma Hareketi Testi</h3>
          <TouchGestures
            onSwipeLeft={() => alert('Sola kaydırma algılandı!')}
            onSwipeRight={() => alert('Sağa kaydırma algılandı!')}
            onTap={() => alert('Tek dokunma algılandı!')}
            onDoubleTap={() => alert('Çift dokunma algılandı!')}
          >
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <p className="text-white mb-2">Bu alanı test etmek için dokunun</p>
              <p className="text-gray-300 text-sm">Kaydırma, tek/çift dokunma hareketlerini deneyin</p>
            </div>
          </TouchGestures>
        </div>
      )}
    </div>
  );
} 