'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGamificationStore } from '../../stores/gamificationStore';

interface GamificationDashboardProps {
  className?: string;
}

export function GamificationDashboard({ className = '' }: GamificationDashboardProps) {
  const {
    totalXP,
    level,
    currentXP,
    xpToNextLevel,
    currentStreak,
    longestStreak,
    earnedBadgeIds,
    isLoading,
    error
  } = useGamificationStore();

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="ml-2 text-white">Gamification verileri yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-500/20 border border-red-500/50 rounded-lg p-4 ${className}`}>
        <p className="text-red-300">Hata: {error}</p>
      </div>
    );
  }

  const progressPercentage = ((currentXP / xpToNextLevel) * 100);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Üst Bilgi Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toplam XP */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{totalXP}</div>
          <div className="text-sm opacity-80">Toplam XP</div>
        </div>

        {/* Mevcut Seviye */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{level}</div>
          <div className="text-sm opacity-80">Seviye</div>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{currentStreak}</div>
          <div className="text-sm opacity-80">Günlük Streak</div>
        </div>
      </div>

      {/* Seviye İlerleme */}
      <div className="bg-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">Seviye {level}</span>
          <span className="text-gray-300 text-sm">
            {currentXP} / {xpToNextLevel} XP
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="text-xs text-gray-300">
          Toplam XP: {totalXP}
        </div>
      </div>

      {/* Streak Bilgisi */}
      <div className="flex items-center space-x-2 bg-orange-500/20 rounded-full px-4 py-2">
        <span className="text-2xl">🔥</span>
        <div>
          <div className="font-bold text-orange-400">{currentStreak} gün</div>
          <div className="text-orange-300 text-xs">En uzun: {longestStreak}</div>
        </div>
      </div>

      {/* Rozet Bilgisi */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Rozet Koleksiyonu</h3>
        <div className="text-center py-4">
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-white">Kazanılan Rozet: {earnedBadgeIds?.length || 0}</p>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 text-center">
        <p className="text-white/80 text-sm">
          🎯 Hedef: Seviye {level + 1} için {xpToNextLevel - currentXP} XP daha gerekli
        </p>
        <p className="text-white/60 text-xs mt-1">
          Daha fazla quiz çözerek puanlarını artır ve seviye atla!
        </p>
      </div>
    </div>
  );
}

// Kompakt versiyon (sidebar için)
export function CompactGamificationDashboard({ className = '' }: GamificationDashboardProps) {
  const {
    totalXP,
    level,
    currentStreak,
    isLoading
  } = useGamificationStore();

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Kompakt XP ve Level */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm">XP</span>
          <span className="text-white font-bold">{totalXP}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-white/80 text-sm">Seviye</span>
          <span className="text-white font-bold">{level}</span>
        </div>
      </div>

      {/* Kompakt Streak */}
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm">Streak</span>
          <span className="text-white font-bold">{currentStreak} 🔥</span>
        </div>
      </div>
    </div>
  );
} 