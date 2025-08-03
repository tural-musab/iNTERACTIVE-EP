export interface Level {
  level: number;
  minXP: number;
  maxXP: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  rewards: {
    xpBonus: number;
    badgeId?: string;
    specialFeature?: string;
  };
}

export const LEVELS: Level[] = [
  // Başlangıç Seviyeleri (1-10)
  {
    level: 1,
    minXP: 0,
    maxXP: 99,
    title: 'Yeni Başlayan',
    description: 'Öğrenme yolculuğuna başladın!',
    color: '#4CAF50',
    icon: '🌱',
    rewards: { xpBonus: 0 }
  },
  {
    level: 2,
    minXP: 100,
    maxXP: 299,
    title: 'Çırak',
    description: 'İlk adımlarını atıyorsun!',
    color: '#4CAF50',
    icon: '📚',
    rewards: { xpBonus: 10 }
  },
  {
    level: 3,
    minXP: 300,
    maxXP: 599,
    title: 'Öğrenci',
    description: 'Bilgi birikimini artırıyorsun!',
    color: '#4CAF50',
    icon: '🎓',
    rewards: { xpBonus: 20 }
  },
  {
    level: 4,
    minXP: 600,
    maxXP: 999,
    title: 'Araştırmacı',
    description: 'Daha derinlere iniyorsun!',
    color: '#4CAF50',
    icon: '🔍',
    rewards: { xpBonus: 30 }
  },
  {
    level: 5,
    minXP: 1000,
    maxXP: 1599,
    title: 'Bilgi Avcısı',
    description: 'Bilgiyi avlıyorsun!',
    color: '#4CAF50',
    icon: '🎯',
    rewards: { xpBonus: 40 }
  },
  {
    level: 6,
    minXP: 1600,
    maxXP: 2299,
    title: 'Öğrenme Tutkunu',
    description: 'Öğrenmeye tutkuyla bağlısın!',
    color: '#4CAF50',
    icon: '❤️',
    rewards: { xpBonus: 50 }
  },
  {
    level: 7,
    minXP: 2300,
    maxXP: 3099,
    title: 'Bilgi Toplayıcı',
    description: 'Bilgiyi topluyorsun!',
    color: '#4CAF50',
    icon: '📦',
    rewards: { xpBonus: 60 }
  },
  {
    level: 8,
    minXP: 3100,
    maxXP: 3999,
    title: 'Öğrenme Yolcusu',
    description: 'Yolculuğuna devam ediyorsun!',
    color: '#4CAF50',
    icon: '🚶',
    rewards: { xpBonus: 70 }
  },
  {
    level: 9,
    minXP: 4000,
    maxXP: 4999,
    title: 'Bilgi Keşifçisi',
    description: 'Yeni ufuklar keşfediyorsun!',
    color: '#4CAF50',
    icon: '🗺️',
    rewards: { xpBonus: 80 }
  },
  {
    level: 10,
    minXP: 5000,
    maxXP: 5999,
    title: 'Çırak Ustası',
    description: 'Çıraklık dönemini tamamladın!',
    color: '#2196F3',
    icon: '⚡',
    rewards: { xpBonus: 100, badgeId: 'level_10' }
  },

  // Orta Seviyeler (11-25)
  {
    level: 11,
    minXP: 6000,
    maxXP: 7199,
    title: 'Kalfa',
    description: 'Kalfalık yolculuğuna başladın!',
    color: '#2196F3',
    icon: '🔨',
    rewards: { xpBonus: 120 }
  },
  {
    level: 15,
    minXP: 12000,
    maxXP: 13999,
    title: 'Uzman Adayı',
    description: 'Uzmanlığa doğru ilerliyorsun!',
    color: '#2196F3',
    icon: '🎯',
    rewards: { xpBonus: 150 }
  },
  {
    level: 20,
    minXP: 20000,
    maxXP: 22999,
    title: 'Bilgi Ustası',
    description: 'Bilgi konusunda ustalaşıyorsun!',
    color: '#FF9800',
    icon: '🏆',
    rewards: { xpBonus: 200 }
  },
  {
    level: 25,
    minXP: 30000,
    maxXP: 33999,
    title: 'Öğrenme Şampiyonu',
    description: 'Şampiyonluk seviyesindesin!',
    color: '#FF9800',
    icon: '🥇',
    rewards: { xpBonus: 250 }
  },

  // İleri Seviyeler (26-50)
  {
    level: 30,
    minXP: 42000,
    maxXP: 46999,
    title: 'Bilgi Savaşçısı',
    description: 'Bilgi savaşında ön saflardasın!',
    color: '#FF9800',
    icon: '⚔️',
    rewards: { xpBonus: 300 }
  },
  {
    level: 40,
    minXP: 60000,
    maxXP: 65999,
    title: 'Öğrenme Kahramanı',
    description: 'Kahramanlık seviyesindesin!',
    color: '#F44336',
    icon: '🦸',
    rewards: { xpBonus: 400 }
  },
  {
    level: 50,
    minXP: 80000,
    maxXP: 86999,
    title: 'Bilgi Efsanesi',
    description: 'Efsanevi seviyeye ulaştın!',
    color: '#F44336',
    icon: '👑',
    rewards: { xpBonus: 500, badgeId: 'level_50' }
  },

  // Uzman Seviyeler (51-75)
  {
    level: 60,
    minXP: 105000,
    maxXP: 112999,
    title: 'Bilgi Dehası',
    description: 'Deha seviyesindesin!',
    color: '#9C27B0',
    icon: '🧠',
    rewards: { xpBonus: 600 }
  },
  {
    level: 70,
    minXP: 135000,
    maxXP: 143999,
    title: 'Öğrenme Tanrısı',
    description: 'Tanrısal seviyedesin!',
    color: '#9C27B0',
    icon: '⚡',
    rewards: { xpBonus: 700 }
  },
  {
    level: 75,
    minXP: 150000,
    maxXP: 159999,
    title: 'Bilgi İmparatoru',
    description: 'İmparatorluk seviyesindesin!',
    color: '#9C27B0',
    icon: '👑',
    rewards: { xpBonus: 750 }
  },

  // Efsanevi Seviyeler (76-100)
  {
    level: 80,
    minXP: 170000,
    maxXP: 179999,
    title: 'Bilgi Efsanesi',
    description: 'Efsanevi seviyedesin!',
    color: '#FFD700',
    icon: '🌟',
    rewards: { xpBonus: 800 }
  },
  {
    level: 90,
    minXP: 200000,
    maxXP: 209999,
    title: 'Öğrenme Mitolojisi',
    description: 'Mitolojik seviyedesin!',
    color: '#FFD700',
    icon: '🏛️',
    rewards: { xpBonus: 900 }
  },
  {
    level: 100,
    minXP: 250000,
    maxXP: 259999,
    title: 'Bilgi Tanrısı',
    description: 'Tanrısal seviyeye ulaştın!',
    color: '#FFD700',
    icon: '⚡',
    rewards: { xpBonus: 1000, badgeId: 'level_100' }
  }
];

// XP'ye göre seviye hesaplama
export const calculateLevel = (xp: number): { level: number; currentXP: number; xpToNextLevel: number } => {
  const level = LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP);
  
  if (!level) {
    // En yüksek seviyede
    const maxLevel = LEVELS[LEVELS.length - 1];
    return {
      level: maxLevel.level,
      currentXP: xp - maxLevel.minXP,
      xpToNextLevel: 0
    };
  }

  return {
    level: level.level,
    currentXP: xp - level.minXP,
    xpToNextLevel: level.maxXP - xp
  };
};

// Seviyeye göre level bilgisi alma
export const getLevelInfo = (level: number): Level | undefined => {
  return LEVELS.find(l => l.level === level);
};

// Seviye aralığına göre level'ları alma
export const getLevelsInRange = (minLevel: number, maxLevel: number): Level[] => {
  return LEVELS.filter(l => l.level >= minLevel && l.level <= maxLevel);
};

// XP'ye göre ilerleme yüzdesi hesaplama
export const calculateProgressPercentage = (xp: number): number => {
  const levelInfo = calculateLevel(xp);
  const currentLevel = getLevelInfo(levelInfo.level);
  
  if (!currentLevel || levelInfo.xpToNextLevel === 0) {
    return 100;
  }

  const levelXP = currentLevel.maxXP - currentLevel.minXP;
  const progress = levelInfo.currentXP / levelXP;
  
  return Math.round(progress * 100);
};

// Seviye başlıklarına göre renk alma
export const getLevelColor = (level: number): string => {
  const levelInfo = getLevelInfo(level);
  return levelInfo?.color || '#4CAF50';
};

// Seviye ikonuna göre icon alma
export const getLevelIcon = (level: number): string => {
  const levelInfo = getLevelInfo(level);
  return levelInfo?.icon || '📚';
};

// Seviye kategorileri
export const LEVEL_CATEGORIES = {
  BEGINNER: { min: 1, max: 10, name: 'Başlangıç', color: '#4CAF50' },
  INTERMEDIATE: { min: 11, max: 25, name: 'Orta', color: '#2196F3' },
  ADVANCED: { min: 26, max: 50, name: 'İleri', color: '#FF9800' },
  EXPERT: { min: 51, max: 75, name: 'Uzman', color: '#F44336' },
  LEGENDARY: { min: 76, max: 100, name: 'Efsanevi', color: '#9C27B0' },
  MYTHICAL: { min: 101, max: 999, name: 'Mitolojik', color: '#FFD700' }
};

// Seviye kategorisine göre filtreleme
export const getLevelsByCategory = (category: keyof typeof LEVEL_CATEGORIES): Level[] => {
  const cat = LEVEL_CATEGORIES[category];
  return LEVELS.filter(l => l.level >= cat.min && l.level <= cat.max);
};
