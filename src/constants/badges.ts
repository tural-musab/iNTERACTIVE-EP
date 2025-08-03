export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'streak' | 'level' | 'special';
  requirement: {
    type: 'quiz_completed' | 'streak_days' | 'level_reached' | 'points_earned' | 'accuracy_rate';
    value: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointsReward: number;
  color: string;
}

export const BADGES: Badge[] = [
  // Quiz Tamamlama Rozetleri
  {
    id: 'first_quiz',
    name: 'İlk Adım',
    description: 'İlk quizini tamamladın!',
    icon: '🎯',
    category: 'achievement',
    requirement: {
      type: 'quiz_completed',
      value: 1
    },
    rarity: 'common',
    pointsReward: 50,
    color: '#4CAF50'
  },
  {
    id: 'quiz_master',
    name: 'Quiz Ustası',
    description: '100 quiz tamamladın!',
    icon: '🏆',
    category: 'achievement',
    requirement: {
      type: 'quiz_completed',
      value: 100
    },
    rarity: 'epic',
    pointsReward: 500,
    color: '#FF9800'
  },
  {
    id: 'speed_demon',
    name: 'Hız Ustası',
    description: '10 soruyu 5 dakikada tamamladın!',
    icon: '⚡',
    category: 'achievement',
    requirement: {
      type: 'quiz_completed',
      value: 1 // Özel durum: hız kontrolü
    },
    rarity: 'rare',
    pointsReward: 200,
    color: '#2196F3'
  },

  // Streak Rozetleri
  {
    id: 'week_warrior',
    name: 'Haftalık Savaşçı',
    description: '7 gün üst üste quiz çözdün!',
    icon: '🔥',
    category: 'streak',
    requirement: {
      type: 'streak_days',
      value: 7
    },
    rarity: 'rare',
    pointsReward: 300,
    color: '#F44336'
  },
  {
    id: 'month_master',
    name: 'Aylık Usta',
    description: '30 gün üst üste quiz çözdün!',
    icon: '💎',
    category: 'streak',
    requirement: {
      type: 'streak_days',
      value: 30
    },
    rarity: 'legendary',
    pointsReward: 1000,
    color: '#9C27B0'
  },

  // Seviye Rozetleri
  {
    id: 'level_10',
    name: 'Çırak',
    description: 'Seviye 10\'a ulaştın!',
    icon: '📚',
    category: 'level',
    requirement: {
      type: 'level_reached',
      value: 10
    },
    rarity: 'common',
    pointsReward: 100,
    color: '#4CAF50'
  },
  {
    id: 'level_50',
    name: 'Uzman',
    description: 'Seviye 50\'ye ulaştın!',
    icon: '🎓',
    category: 'level',
    requirement: {
      type: 'level_reached',
      value: 50
    },
    rarity: 'epic',
    pointsReward: 800,
    color: '#FF9800'
  },
  {
    id: 'level_100',
    name: 'Efsane',
    description: 'Seviye 100\'e ulaştın!',
    icon: '👑',
    category: 'level',
    requirement: {
      type: 'level_reached',
      value: 100
    },
    rarity: 'legendary',
    pointsReward: 2000,
    color: '#FFD700'
  },

  // Puan Rozetleri
  {
    id: 'point_collector',
    name: 'Puan Toplayıcı',
    description: '1000 puan topladın!',
    icon: '💰',
    category: 'achievement',
    requirement: {
      type: 'points_earned',
      value: 1000
    },
    rarity: 'rare',
    pointsReward: 400,
    color: '#FFC107'
  },
  {
    id: 'point_millionaire',
    name: 'Puan Milyoneri',
    description: '10000 puan topladın!',
    icon: '💎',
    category: 'achievement',
    requirement: {
      type: 'points_earned',
      value: 10000
    },
    rarity: 'legendary',
    pointsReward: 1500,
    color: '#E91E63'
  },

  // Doğruluk Rozetleri
  {
    id: 'perfect_score',
    name: 'Mükemmel Skor',
    description: 'Bir quizde %100 doğruluk elde ettin!',
    icon: '⭐',
    category: 'achievement',
    requirement: {
      type: 'accuracy_rate',
      value: 100
    },
    rarity: 'epic',
    pointsReward: 600,
    color: '#FFD700'
  },
  {
    id: 'accuracy_master',
    name: 'Doğruluk Ustası',
    description: 'Ortalama %90 doğruluk oranına ulaştın!',
    icon: '🎯',
    category: 'achievement',
    requirement: {
      type: 'accuracy_rate',
      value: 90
    },
    rarity: 'legendary',
    pointsReward: 1200,
    color: '#00BCD4'
  },

  // Özel Rozetler
  {
    id: 'early_bird',
    name: 'Erken Kuş',
    description: 'Sabah 6-9 arası quiz çözdün!',
    icon: '🌅',
    category: 'special',
    requirement: {
      type: 'quiz_completed',
      value: 1 // Özel durum: zaman kontrolü
    },
    rarity: 'rare',
    pointsReward: 150,
    color: '#FF9800'
  },
  {
    id: 'night_owl',
    name: 'Gece Kuşu',
    description: 'Gece 22-02 arası quiz çözdün!',
    icon: '🦉',
    category: 'special',
    requirement: {
      type: 'quiz_completed',
      value: 1 // Özel durum: zaman kontrolü
    },
    rarity: 'rare',
    pointsReward: 150,
    color: '#673AB7'
  }
];

// Badge kategorilerine göre filtreleme
export const getBadgesByCategory = (category: Badge['category']): Badge[] => {
  return BADGES.filter(badge => badge.category === category);
};

// Badge rarity'sine göre filtreleme
export const getBadgesByRarity = (rarity: Badge['rarity']): Badge[] => {
  return BADGES.filter(badge => badge.rarity === rarity);
};

// Badge ID'sine göre bulma
export const getBadgeById = (id: string): Badge | undefined => {
  return BADGES.find(badge => badge.id === id);
};

// Kullanıcının kazandığı rozetleri filtreleme
export const getEarnedBadges = (earnedBadgeIds: string[]): Badge[] => {
  return BADGES.filter(badge => earnedBadgeIds.includes(badge.id));
};

// Kullanıcının henüz kazanmadığı rozetleri filtreleme
export const getUnearnedBadges = (earnedBadgeIds: string[]): Badge[] => {
  return BADGES.filter(badge => !earnedBadgeIds.includes(badge.id));
};

// Rarity renkleri
export const RARITY_COLORS = {
  common: '#4CAF50',
  rare: '#2196F3',
  epic: '#FF9800',
  legendary: '#9C27B0'
};

// Rarity isimleri
export const RARITY_NAMES = {
  common: 'Yaygın',
  rare: 'Nadir',
  epic: 'Efsanevi',
  legendary: 'Efsane'
};
