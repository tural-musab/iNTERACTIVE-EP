'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  className?: string;
  swipeThreshold?: number;
  enableGestures?: boolean;
}

export function TouchGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  className = '',
  swipeThreshold = 50,
  enableGestures = true
}: TouchGesturesProps) {
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout>();
  const doubleTapDelay = 300; // ms

  const handleTap = () => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapTime;

    if (timeDiff < doubleTapDelay) {
      // Double tap detected
      setTapCount(0);
      onDoubleTap?.();
    } else {
      // Single tap
      setTapCount(1);
      setLastTapTime(currentTime);
      
      // Clear previous timeout
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      
      // Set timeout for single tap
      tapTimeoutRef.current = setTimeout(() => {
        if (tapCount === 1) {
          onTap?.();
        }
        setTapCount(0);
      }, doubleTapDelay);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (!enableGestures) return;

    const { offset, velocity } = info;
    const { x, y } = offset;
    const { x: vx, y: vy } = velocity;

    // Check if the gesture meets the threshold
    const isSignificantSwipe = Math.abs(x) > swipeThreshold || Math.abs(y) > swipeThreshold;
    const isFastSwipe = Math.abs(vx) > 500 || Math.abs(vy) > 500;

    if (isSignificantSwipe || isFastSwipe) {
      // Determine swipe direction
      if (Math.abs(x) > Math.abs(y)) {
        // Horizontal swipe
        if (x > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (y > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  if (!enableGestures) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      drag={enableGestures}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Hook for custom touch gestures
export function useTouchGestures() {
  const [gestures, setGestures] = useState({
    isSwiping: false,
    swipeDirection: null as 'left' | 'right' | 'up' | 'down' | null,
    isPinching: false,
    pinchScale: 1,
    isRotating: false,
    rotationAngle: 0
  });

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && touchStartRef.current) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        setGestures(prev => ({ ...prev, isSwiping: true }));
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartRef.current) {
      const touch = e.changedTouches[0];
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;
      const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 'right' : 'left';
        setGestures(prev => ({ 
          ...prev, 
          isSwiping: false, 
          swipeDirection: direction 
        }));
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 'down' : 'up';
        setGestures(prev => ({ 
          ...prev, 
          isSwiping: false, 
          swipeDirection: direction 
        }));
      } else {
        setGestures(prev => ({ ...prev, isSwiping: false }));
      }

      // Reset after a short delay
      setTimeout(() => {
        setGestures(prev => ({ ...prev, swipeDirection: null }));
      }, 300);

      touchStartRef.current = null;
      touchEndRef.current = null;
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return gestures;
}

// Swipeable card component
interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export function SwipeableCard({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className = '' 
}: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const { offset } = info;
    const { x } = offset;

    if (Math.abs(x) > 50) {
      setDragDirection(x > 0 ? 'right' : 'left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    const { x } = offset;
    const { x: vx } = velocity;

    if (Math.abs(x) > 100 || Math.abs(vx) > 500) {
      if (x > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
    
    setDragDirection(null);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={{
        x: isDragging ? 0 : 0,
        rotate: dragDirection === 'left' ? -5 : dragDirection === 'right' ? 5 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
      
      {/* Swipe indicators */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          {dragDirection === 'left' && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-3 py-2 rounded-lg">
              ❌
            </div>
          )}
          {dragDirection === 'right' && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-2 rounded-lg">
              ✅
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
} 