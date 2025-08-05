import supabase from '../lib/supabaseClient';

// Utility function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

interface PointCalculation {
  basePoints: number;        // Temel puan (10)
  difficultyMultiplier: number; // Zorluk çarpanı (1.0-2.0)
  streakBonus: number;       // Streak bonusu (0-50)
  timeBonus: number;         // Hızlı cevap bonusu (0-20)
  accuracyBonus: number;     // Doğruluk bonusu (0-30)
}

export class PointSystem {
  static calculatePoints(
    isCorrect: boolean,
    difficulty: 'easy' | 'medium' | 'hard',
    streak: number,
    timeSpent: number,
    averageTime: number
  ): number {
    if (!isCorrect) return 0;

    const basePoints = 10;
    const difficultyMultiplier = {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    }[difficulty];

    const streakBonus = Math.min(streak * 2, 50);
    const timeBonus = timeSpent < averageTime * 0.5 ? 20 : 0;
    const accuracyBonus = 30; // Doğru cevap için

    return Math.round(
      basePoints * difficultyMultiplier + streakBonus + timeBonus + accuracyBonus
    );
  }
}

export class PointTracker {
  static async addPoints(
    userId: string,
    points: number,
    reason: string,
    metadata?: Record<string, any>
  ) {
    // NOT: Artık doğrudan veritabanına yazmıyoruz
    // Bu fonksiyon Edge Function tarafından çağrılmalı
    console.warn('PointTracker.addPoints is deprecated. Use Edge Function instead.');
    
    // Edge Function çağrısı örneği:
    // const { data, error } = await supabase.functions.invoke('award-quiz-points', {
    //   body: { quiz_attempt_id: attemptId }
    // });
  }

  static async getTotalPoints(userId: string): Promise<number> {
    const { data } = await supabase
      .from('point_history')
      .select('points')
      .eq('user_id', userId);

    return data?.reduce((sum, record) => sum + record.points, 0) || 0;
  }

  private static async updateTotalPoints(userId: string, points: number) {
    // NOT: Artık doğrudan veritabanına yazmıyoruz
    // Bu işlem Edge Function tarafından yapılıyor
    console.warn('PointTracker.updateTotalPoints is deprecated. Use Edge Function instead.');
  }
}

export class StreakSystem {
  static async updateStreak(userId: string, activityType: 'quiz' | 'login') {
    const today = new Date();
    const { data: streakData } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!streakData) {
      // İlk streak kaydı
      await supabase.from('user_streaks').insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        last_activity_date: today,
        streak_type: activityType
      });
      return;
    }

    const lastActivity = new Date(streakData.last_activity_date);
    const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      // Ardışık gün
      const newStreak = streakData.current_streak + 1;
      await supabase
        .from('user_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, streakData.longest_streak),
          last_activity_date: today
        })
        .eq('user_id', userId);
    } else if (daysDiff > 1) {
      // Streak kırıldı
      await supabase
        .from('user_streaks')
        .update({
          current_streak: 1,
          last_activity_date: today
        })
        .eq('user_id', userId);
    }
  }

  static async getStreakBonus(userId: string): Promise<number> {
    const { data } = await supabase
      .from('user_streaks')
      .select('current_streak')
      .eq('user_id', userId)
      .single();

    return data?.current_streak || 0;
  }
}

export class BadgeSystem {
  static badges = [
    {
      id: 'first_quiz',
      name: 'İlk Adım',
      description: 'İlk quizini tamamladın!',
      icon: '🎯',
      category: 'achievement' as const,
      requirement: { type: 'quiz_count' as const, value: 1, condition: 'equals' as const },
      rarity: 'common' as const,
      pointsReward: 50
    },
    {
      id: 'streak_7',
      name: 'Haftalık Tutarlı',
      description: '7 gün üst üste aktif oldun!',
      icon: '🔥',
      category: 'streak' as const,
      requirement: { type: 'streak_days' as const, value: 7, condition: 'equals' as const },
      rarity: 'rare' as const,
      pointsReward: 100
    },
    {
      id: 'perfect_score',
      name: 'Mükemmeliyetçi',
      description: 'Bir quizde %100 başarı elde ettin!',
      icon: '⭐',
      category: 'quiz' as const,
      requirement: { type: 'accuracy_rate' as const, value: 100, condition: 'equals' as const },
      rarity: 'epic' as const,
      pointsReward: 200
    }
  ];

  static async checkAndAwardBadges(userId: string) {
    const userStats = await this.getUserStats(userId);
    const userBadges = await this.getUserBadges(userId);

    for (const badge of this.badges) {
      if (userBadges.some(ub => ub.badge_id === badge.id)) continue;

      if (this.checkBadgeRequirement(badge, userStats)) {
        await this.awardBadge(userId, badge);
      }
    }
  }

  static checkBadgeRequirement(badge: any, userStats: any): boolean {
    const { type, value, condition } = badge.requirement;
    const userValue = userStats[type];

    switch (condition) {
      case 'equals':
        return userValue === value;
      case 'greater_than':
        return userValue > value;
      case 'less_than':
        return userValue < value;
      default:
        return false;
    }
  }

  static async awardBadge(userId: string, badge: any) {
    // NOT: Artık doğrudan veritabanına yazmıyoruz
    // Bu işlem Edge Function tarafından yapılmalı
    console.warn('BadgeSystem.awardBadge is deprecated. Use Edge Function instead.');
    
    // Edge Function çağrısı örneği:
    // const { data, error } = await supabase.functions.invoke('award-badge', {
    //   body: { userId, badgeId: badge.id }
    // });

    // Bildirim gönder
    this.showBadgeNotification(badge);
  }

  private static async getUserStats(userId: string) {
    const { data } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return data || {};
  }

  private static async getUserBadges(userId: string) {
    const { data } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId);
    
    return data || [];
  }

  private static showBadgeNotification(badge: any) {
    // TODO: Implement notification system
    console.log(`🎉 Yeni rozet kazandın: ${badge.name}!`);
  }
}

export class LevelSystem {
  static calculateLevel(totalXP: number) {
    // Her seviye için gerekli XP: level * 100
    let level = 1;
    let xpForCurrentLevel = 0;
    let xpForNextLevel = 100;

    while (totalXP >= xpForNextLevel) {
      xpForCurrentLevel = xpForNextLevel;
      level++;
      xpForNextLevel += level * 100;
    }

    const currentXP = totalXP - xpForCurrentLevel;
    const xpToNextLevel = xpForNextLevel - totalXP;

    return {
      level,
      currentXP,
      xpToNextLevel,
      totalXP
    };
  }

  static async updateUserLevel(userId: string, xpGained: number) {
    const { data: userData } = await supabase
      .from('users')
      .select('total_xp, level')
      .eq('id', userId)
      .single();

    const newTotalXP = (userData?.total_xp || 0) + xpGained;
    const newLevelData = this.calculateLevel(newTotalXP);

    await supabase
      .from('users')
      .update({
        total_xp: newTotalXP,
        level: newLevelData.level
      })
      .eq('id', userId);

    // Seviye atladıysa bildirim gönder
    if (newLevelData.level > (userData?.level || 0)) {
      this.showLevelUpNotification(newLevelData.level);
    }

    return newLevelData;
  }

  private static showLevelUpNotification(newLevel: number) {
    // TODO: Implement notification system
    console.log(`🎉 Seviye ${newLevel}'e yükseldin!`);
  }
}
