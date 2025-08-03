'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGamificationStore } from '../../stores/gamificationStore';
import { StreakDisplay } from './StreakDisplay';
import { BadgeCollection } from './BadgeCollection';
import { LevelProgress } from './LevelProgress';
import { Leaderboard } from './Leaderboard';
import { useAnimations } from '../../hooks/useAnimations';

interface GamificationDashboardProps {
  className?: string;
}

export function GamificationDashboard({ className = '' }: GamificationDashboardProps) {
  const { gamificationAnimations } = useAnimations();
  const {
    totalXP,
    level,
    currentXP,
    xpToNextLevel,
    currentStreak,
    longestStreak,
    earnedBadgeIds,
    leaderboard,
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

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      variants={gamificationAnimations.leaderboard}
      initial="initial"
      animate="animate"
    >
      {/* Üst Bilgi Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toplam XP */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white"
          variants={gamificationAnimations.streak}
          whileHover="hover"
        >
          <div className="text-2xl font-bold">{totalXP}</div>
          <div className="text-sm opacity-80">Toplam XP</div>
        </motion.div>

        {/* Mevcut Seviye */}
        <motion.div
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-4 text-white"
          variants={gamificationAnimations.streak}
          whileHover="hover"
        >
          <div className="text-2xl font-bold">{level}</div>
          <div className="text-sm opacity-80">Seviye</div>
        </motion.div>

        {/* Streak */}
        <motion.div
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 text-white"
          variants={gamificationAnimations.streak}
          whileHover="hover"
        >
          <div className="text-2xl font-bold">{currentStreak}</div>
          <div className="text-sm opacity-80">Günlük Streak</div>
        </motion.div>
      </div>

      {/* Ana İçerik Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Kolon */}
        <div className="space-y-6">
          {/* Seviye İlerleme */}
          <motion.div
            variants={gamificationAnimations.streak}
            whileHover="hover"
          >
            <LevelProgress
              level={level}
              currentXP={currentXP}
              xpToNextLevel={xpToNextLevel}
            />
          </motion.div>

          {/* Streak Display */}
          <motion.div
            variants={gamificationAnimations.streak}
            whileHover="hover"
          >
            <StreakDisplay
              currentStreak={currentStreak}
              longestStreak={longestStreak}
            />
          </motion.div>
        </div>

        {/* Sağ Kolon */}
        <div className="space-y-6">
          {/* Rozet Koleksiyonu */}
          <motion.div
            variants={gamificationAnimations.badgeUnlock}
            whileHover="hover"
          >
            <BadgeCollection
              earnedBadgeIds={earnedBadgeIds}
              showUnearned={false}
              maxDisplay={8}
            />
          </motion.div>

          {/* Liderlik Tablosu */}
          <motion.div
            variants={gamificationAnimations.leaderboard}
            whileHover="hover"
          >
            <Leaderboard
              entries={leaderboard}
              currentUserId={null} // Kullanıcı ID'sini al
            />
          </motion.div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-lg p-4 text-center"
        variants={gamificationAnimations.streak}
      >
        <p className="text-white/80 text-sm">
          🎯 Hedef: Seviye {level + 1} için {xpToNextLevel - currentXP} XP daha gerekli
        </p>
        <p className="text-white/60 text-xs mt-1">
          Daha fazla quiz çözerek puanlarını artır ve seviye atla!
        </p>
      </motion.div>
    </motion.div>
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
    <motion.div
      className={`space-y-3 ${className}`}
      variants={{
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
      }}
      initial="initial"
      animate="animate"
    >
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
    </motion.div>
  );
} 