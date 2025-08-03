'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimations } from '../../hooks/useAnimations';
import Confetti from 'react-confetti';

interface PointsAnimationProps {
  points: number;
  reason?: string;
  position?: { x: number; y: number };
  onComplete?: () => void;
  showConfetti?: boolean;
}

interface FloatingPointsProps {
  points: number;
  position: { x: number; y: number };
  onComplete: () => void;
}

// Yüzen puan animasyonu
function FloatingPoints({ points, position, onComplete }: FloatingPointsProps) {
  const { gamificationAnimations } = useAnimations();

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
      }}
      variants={gamificationAnimations.pointsIncrease}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg px-3 py-1 rounded-full shadow-lg">
        +{points}
      </div>
    </motion.div>
  );
}

// Level up animasyonu
interface LevelUpAnimationProps {
  newLevel: number;
  onComplete?: () => void;
}

function LevelUpAnimation({ newLevel, onComplete }: LevelUpAnimationProps) {
  const { gamificationAnimations } = useAnimations();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFE66D']}
        />
      )}
      
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center p-8 rounded-3xl shadow-2xl"
        variants={gamificationAnimations.levelUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-2xl font-bold mb-2">Seviye Atladın!</div>
        <div className="text-4xl font-bold text-yellow-300">Seviye {newLevel}</div>
        <div className="text-sm mt-2 opacity-80">Tebrikler! Daha da iyisini yapabilirsin!</div>
      </motion.div>
    </div>
  );
}

// Ana PointsAnimation component'i
export function PointsAnimation({ 
  points, 
  reason, 
  position = { x: 0, y: 0 }, 
  onComplete,
  showConfetti = false 
}: PointsAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  useEffect(() => {
    // Level up kontrolü (örnek: 100 puan = 1 level)
    if (points >= 100 && reason === 'level_up') {
      setNewLevel(Math.floor(points / 100));
      setShowLevelUp(true);
    }

    // Normal puan animasyonu için timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [points, reason, onComplete]);

  return (
    <>
      <AnimatePresence>
        {isVisible && !showLevelUp && (
          <FloatingPoints
            points={points}
            position={position}
            onComplete={() => setIsVisible(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLevelUp && (
          <LevelUpAnimation
            newLevel={newLevel}
            onComplete={() => {
              setShowLevelUp(false);
              onComplete?.();
            }}
          />
        )}
      </AnimatePresence>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={100}
          colors={['#FFD700', '#FF6B6B', '#4ECDC4']}
        />
      )}
    </>
  );
}

// Puan artış animasyonu hook'u
export function usePointsAnimation() {
  const [animations, setAnimations] = useState<Array<{
    id: string;
    points: number;
    position: { x: number; y: number };
    reason?: string;
  }>>([]);

  const addPointsAnimation = (
    points: number, 
    position: { x: number; y: number }, 
    reason?: string
  ) => {
    const id = Date.now().toString();
    setAnimations(prev => [...prev, { id, points, position, reason }]);
  };

  const removeAnimation = (id: string) => {
    setAnimations(prev => prev.filter(anim => anim.id !== id));
  };

  return {
    animations,
    addPointsAnimation,
    removeAnimation
  };
}

// Batch puan animasyonu (birden fazla puan için)
interface BatchPointsAnimationProps {
  points: number[];
  positions: Array<{ x: number; y: number }>;
  onComplete?: () => void;
}

export function BatchPointsAnimation({ points, positions, onComplete }: BatchPointsAnimationProps) {
  const [visibleAnimations, setVisibleAnimations] = useState<Array<{
    id: string;
    points: number;
    position: { x: number; y: number };
  }>>([]);

  useEffect(() => {
    // Animasyonları sırayla göster
    points.forEach((point, index) => {
      setTimeout(() => {
        setVisibleAnimations(prev => [...prev, {
          id: `${Date.now()}-${index}`,
          points: point,
          position: positions[index] || { x: 0, y: 0 }
        }]);
      }, index * 200);
    });

    // Tüm animasyonlar tamamlandığında callback'i çağır
    const timer = setTimeout(() => {
      onComplete?.();
    }, points.length * 200 + 2000);

    return () => clearTimeout(timer);
  }, [points, positions, onComplete]);

  return (
    <>
      {visibleAnimations.map(({ id, points, position }) => (
        <FloatingPoints
          key={id}
          points={points}
          position={position}
          onComplete={() => {
            setVisibleAnimations(prev => prev.filter(anim => anim.id !== id));
          }}
        />
      ))}
    </>
  );
}
