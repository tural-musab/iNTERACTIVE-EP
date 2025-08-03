import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
  batteryLevel?: number;
  networkType?: string;
  isOnline: boolean;
}

interface MobilePerformanceOptions {
  enableFPSMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  enableBatteryMonitoring?: boolean;
  enableNetworkMonitoring?: boolean;
  updateInterval?: number;
}

export function useMobilePerformance(options: MobilePerformanceOptions = {}) {
  const {
    enableFPSMonitoring = true,
    enableMemoryMonitoring = true,
    enableBatteryMonitoring = true,
    enableNetworkMonitoring = true,
    updateInterval = 1000
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0,
    isOnline: navigator.onLine
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();
  const intervalRef = useRef<NodeJS.Timeout>();

  // FPS monitoring
  const measureFPS = useCallback(() => {
    if (!enableFPSMonitoring || !isMonitoring) return;

    frameCountRef.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(measureFPS);
  }, [enableFPSMonitoring, isMonitoring]);

  // Memory monitoring
  const updateMemoryUsage = useCallback(() => {
    if (!enableMemoryMonitoring) return;

    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  }, [enableMemoryMonitoring]);

  // Battery monitoring
  const updateBatteryStatus = useCallback(async () => {
    if (!enableBatteryMonitoring) return;

    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        const batteryLevel = Math.round(battery.level * 100);
        setMetrics(prev => ({ ...prev, batteryLevel }));
      } catch (error) {
        console.warn('Battery API not available:', error);
      }
    }
  }, [enableBatteryMonitoring]);

  // Network monitoring
  const updateNetworkStatus = useCallback(() => {
    if (!enableNetworkMonitoring) return;

    const isOnline = navigator.onLine;
    setMetrics(prev => ({ ...prev, isOnline }));

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const networkType = connection.effectiveType || 'unknown';
      setMetrics(prev => ({ ...prev, networkType }));
    }
  }, [enableNetworkMonitoring]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    // Measure initial load time
    const loadTime = performance.now() - performance.timing.navigationStart;
    setMetrics(prev => ({ ...prev, loadTime }));

    // Start FPS monitoring
    if (enableFPSMonitoring) {
      measureFPS();
    }

    // Start interval-based monitoring
    intervalRef.current = setInterval(() => {
      updateMemoryUsage();
      updateNetworkStatus();
    }, updateInterval);

    // Update battery status
    if (enableBatteryMonitoring) {
      updateBatteryStatus();
    }
  }, [enableFPSMonitoring, enableMemoryMonitoring, enableBatteryMonitoring, enableNetworkMonitoring, updateInterval, measureFPS, updateMemoryUsage, updateBatteryStatus, updateNetworkStatus]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];

    if (metrics.fps < 30) {
      suggestions.push('FPS düşük. Animasyonları azaltmayı düşünün.');
    }

    if (metrics.memoryUsage > 100) {
      suggestions.push('Bellek kullanımı yüksek. Gereksiz bileşenleri temizleyin.');
    }

    if (metrics.batteryLevel && metrics.batteryLevel < 20) {
      suggestions.push('Pil seviyesi düşük. Güç tasarrufu modunu etkinleştirin.');
    }

    if (!metrics.isOnline) {
      suggestions.push('İnternet bağlantısı yok. Offline moda geçin.');
    }

    return suggestions;
  }, [metrics]);

  // Performance score calculation
  const getPerformanceScore = useCallback(() => {
    let score = 100;

    // FPS penalty
    if (metrics.fps < 30) score -= 30;
    else if (metrics.fps < 50) score -= 15;

    // Memory penalty
    if (metrics.memoryUsage > 100) score -= 20;
    else if (metrics.memoryUsage > 50) score -= 10;

    // Battery penalty
    if (metrics.batteryLevel && metrics.batteryLevel < 20) score -= 10;

    // Network penalty
    if (!metrics.isOnline) score -= 15;

    return Math.max(0, score);
  }, [metrics]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, [stopMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getOptimizationSuggestions,
    getPerformanceScore
  };
}

// Hook for detecting mobile device capabilities
export function useMobileCapabilities() {
  const [capabilities, setCapabilities] = useState({
    hasTouch: false,
    hasAccelerometer: false,
    hasGyroscope: false,
    hasGeolocation: false,
    hasCamera: false,
    hasMicrophone: false,
    hasVibration: false,
    hasBluetooth: false,
    hasNFC: false,
    maxTouchPoints: 0,
    devicePixelRatio: 1,
    screenOrientation: 'portrait' as 'portrait' | 'landscape'
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Touch support
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const maxTouchPoints = navigator.maxTouchPoints || 0;

      // Device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;

      // Screen orientation
      const screenOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

      // Accelerometer and Gyroscope
      const hasAccelerometer = 'DeviceMotionEvent' in window;
      const hasGyroscope = 'DeviceOrientationEvent' in window;

      // Geolocation
      const hasGeolocation = 'geolocation' in navigator;

      // Media devices
      const hasCamera = 'mediaDevices' in navigator;
      const hasMicrophone = 'mediaDevices' in navigator;

      // Vibration
      const hasVibration = 'vibrate' in navigator;

      // Bluetooth
      const hasBluetooth = 'bluetooth' in navigator;

      // NFC
      const hasNFC = 'NDEFReader' in window;

      setCapabilities({
        hasTouch,
        hasAccelerometer,
        hasGyroscope,
        hasGeolocation,
        hasCamera,
        hasMicrophone,
        hasVibration,
        hasBluetooth,
        hasNFC,
        maxTouchPoints,
        devicePixelRatio,
        screenOrientation
      });
    };

    detectCapabilities();

    // Listen for orientation changes
    const handleOrientationChange = () => {
      setCapabilities(prev => ({
        ...prev,
        screenOrientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      }));
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return capabilities;
}

// Hook for mobile gesture detection
export function useMobileGestures() {
  const [gestures, setGestures] = useState({
    isPinching: false,
    pinchScale: 1,
    isRotating: false,
    rotationAngle: 0,
    isShaking: false,
    shakeIntensity: 0
  });

  const touchStartRef = useRef<{ x: number; y: number; distance: number; angle: number } | null>(null);
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const angle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        ) * 180 / Math.PI;

        touchStartRef.current = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
          distance,
          angle
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchStartRef.current) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const currentAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        ) * 180 / Math.PI;

        const scale = currentDistance / touchStartRef.current.distance;
        const rotation = currentAngle - touchStartRef.current.angle;

        setGestures(prev => ({
          ...prev,
          isPinching: true,
          pinchScale: scale,
          isRotating: true,
          rotationAngle: rotation
        }));
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      setGestures(prev => ({
        ...prev,
        isPinching: false,
        isRotating: false
      }));
    };

    // Shake detection using device motion
    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (e.acceleration) {
        const { x, y, z } = e.acceleration;
        const intensity = Math.sqrt(x! * x! + y! * y! + z! * z!);
        
        if (intensity > 15) { // Threshold for shake detection
          setGestures(prev => ({
            ...prev,
            isShaking: true,
            shakeIntensity: intensity
          }));

          // Reset shake after a short delay
          if (shakeTimeoutRef.current) {
            clearTimeout(shakeTimeoutRef.current);
          }
          
          shakeTimeoutRef.current = setTimeout(() => {
            setGestures(prev => ({
              ...prev,
              isShaking: false,
              shakeIntensity: 0
            }));
          }, 1000);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    if ('DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, []);

  return gestures;
} 