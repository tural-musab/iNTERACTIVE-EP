export interface SoundEffect {
  id: string;
  name: string;
  description: string;
  category: 'quiz' | 'gamification' | 'ui' | 'achievement';
  volume: number; // 0-1 arası
  enabled: boolean;
}

export const SOUND_EFFECTS: SoundEffect[] = [
  // Quiz Sesleri
  {
    id: 'quiz_correct',
    name: 'Doğru Cevap',
    description: 'Doğru cevap verildiğinde çalar',
    category: 'quiz',
    volume: 0.7,
    enabled: true
  },
  {
    id: 'quiz_incorrect',
    name: 'Yanlış Cevap',
    description: 'Yanlış cevap verildiğinde çalar',
    category: 'quiz',
    volume: 0.5,
    enabled: true
  },
  {
    id: 'quiz_complete',
    name: 'Quiz Tamamlandı',
    description: 'Quiz tamamlandığında çalar',
    category: 'quiz',
    volume: 0.8,
    enabled: true
  },
  {
    id: 'quiz_start',
    name: 'Quiz Başladı',
    description: 'Quiz başladığında çalar',
    category: 'quiz',
    volume: 0.6,
    enabled: true
  },

  // Gamification Sesleri
  {
    id: 'points_earned',
    name: 'Puan Kazanıldı',
    description: 'Puan kazanıldığında çalar',
    category: 'gamification',
    volume: 0.6,
    enabled: true
  },
  {
    id: 'level_up',
    name: 'Seviye Atladı',
    description: 'Seviye atladığında çalar',
    category: 'gamification',
    volume: 0.9,
    enabled: true
  },
  {
    id: 'streak_increase',
    name: 'Streak Arttı',
    description: 'Streak arttığında çalar',
    category: 'gamification',
    volume: 0.7,
    enabled: true
  },
  {
    id: 'badge_earned',
    name: 'Rozet Kazanıldı',
    description: 'Rozet kazanıldığında çalar',
    category: 'gamification',
    volume: 0.8,
    enabled: true
  },

  // UI Sesleri
  {
    id: 'button_click',
    name: 'Buton Tıklama',
    description: 'Buton tıklandığında çalar',
    category: 'ui',
    volume: 0.3,
    enabled: true
  },
  {
    id: 'hover_sound',
    name: 'Hover Efekti',
    description: 'Element üzerine gelindiğinde çalar',
    category: 'ui',
    volume: 0.2,
    enabled: false
  },
  {
    id: 'notification',
    name: 'Bildirim',
    description: 'Bildirim geldiğinde çalar',
    category: 'ui',
    volume: 0.5,
    enabled: true
  },

  // Başarım Sesleri
  {
    id: 'achievement_unlocked',
    name: 'Başarım Açıldı',
    description: 'Başarım açıldığında çalar',
    category: 'achievement',
    volume: 0.8,
    enabled: true
  },
  {
    id: 'perfect_score',
    name: 'Mükemmel Skor',
    description: 'Mükemmel skor alındığında çalar',
    category: 'achievement',
    volume: 0.9,
    enabled: true
  },
  {
    id: 'first_place',
    name: 'Birinci Oldu',
    description: 'Liderlik tablosunda birinci olunduğunda çalar',
    category: 'achievement',
    volume: 0.9,
    enabled: true
  }
];

// Ses dosyası URL'leri (örnek)
export const SOUND_URLS: Record<string, string> = {
  quiz_correct: '/sounds/correct.mp3',
  quiz_incorrect: '/sounds/incorrect.mp3',
  quiz_complete: '/sounds/complete.mp3',
  quiz_start: '/sounds/start.mp3',
  points_earned: '/sounds/points.mp3',
  level_up: '/sounds/levelup.mp3',
  streak_increase: '/sounds/streak.mp3',
  badge_earned: '/sounds/badge.mp3',
  button_click: '/sounds/click.mp3',
  hover_sound: '/sounds/hover.mp3',
  notification: '/sounds/notification.mp3',
  achievement_unlocked: '/sounds/achievement.mp3',
  perfect_score: '/sounds/perfect.mp3',
  first_place: '/sounds/firstplace.mp3'
};

// Ses kategorilerine göre filtreleme
export const getSoundsByCategory = (category: SoundEffect['category']): SoundEffect[] => {
  return SOUND_EFFECTS.filter(sound => sound.category === category);
};

// Aktif sesleri alma
export const getActiveSounds = (): SoundEffect[] => {
  return SOUND_EFFECTS.filter(sound => sound.enabled);
};

// Ses ID'sine göre bulma
export const getSoundById = (id: string): SoundEffect | undefined => {
  return SOUND_EFFECTS.find(sound => sound.id === id);
};

// Ses ayarları
export interface SoundSettings {
  masterVolume: number; // 0-1 arası
  musicVolume: number; // 0-1 arası
  sfxVolume: number; // 0-1 arası
  enabled: boolean;
  individualSounds: Record<string, boolean>; // Her ses için ayrı ayar
}

export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  masterVolume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  enabled: true,
  individualSounds: SOUND_EFFECTS.reduce((acc, sound) => {
    acc[sound.id] = sound.enabled;
    return acc;
  }, {} as Record<string, boolean>)
};

// Ses kategorileri
export const SOUND_CATEGORIES = {
  QUIZ: 'quiz',
  GAMIFICATION: 'gamification',
  UI: 'ui',
  ACHIEVEMENT: 'achievement'
} as const;

// Ses efektleri için yardımcı fonksiyonlar
export const calculateEffectiveVolume = (
  soundId: string,
  settings: SoundSettings
): number => {
  const sound = getSoundById(soundId);
  if (!sound || !settings.enabled) return 0;

  const individualEnabled = settings.individualSounds[soundId] ?? true;
  if (!individualEnabled) return 0;

  return (
    settings.masterVolume *
    settings.sfxVolume *
    sound.volume
  );
};

// Ses çalma fonksiyonu (Howler.js ile)
export const playSound = (
  soundId: string,
  settings: SoundSettings,
  howl?: any // Howler instance
): void => {
  if (!howl) return;

  const volume = calculateEffectiveVolume(soundId, settings);
  if (volume > 0) {
    howl.volume(volume);
    howl.play();
  }
};

// Ses durumu kontrolü
export const isSoundEnabled = (soundId: string, settings: SoundSettings): boolean => {
  return (
    settings.enabled &&
    settings.individualSounds[soundId] !== false
  );
};
