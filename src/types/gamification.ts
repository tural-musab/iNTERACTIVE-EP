// src/types/gamification.ts

export type BadgeCategory = 'achievement' | 'streak' | 'quiz' | 'social' | 'special';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PointReason = 'quiz_completion' | 'streak_bonus' | 'achievement' | 'daily_login' | 'speed_bonus' | 'perfect_score' | 'help_peer' | 'first_attempt';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  requirement: BadgeRequirement;
  pointsReward: number;
  hidden?: boolean;
  seasonal?: boolean;
  expiresAt?: Date;
}

export interface BadgeRequirement {
  type: 'quiz_count' | 'streak_days' | 'total_points' | 'accuracy_rate' | 'speed' | 'subject_mastery' | 'peer_help' | 'login_days';
  value: number;
  condition: 'equals' | 'greater_than' | 'less_than' | 'between';
  subject?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time';
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  badge?: Badge;
  awardedAt: Date;
  seen: boolean;
  featured: boolean;
}

export interface PointHistory {
  id: string;
  userId: string;
  points: number;
  reason: PointReason;
  quizId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface UserStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  streakType: 'daily' | 'weekly' | 'quiz';
  freezesAvailable: number;
  freezeUsedToday: boolean;
}

export interface UserStats {
  id: string;
  userId: string;
  totalQuizzesCompleted: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  averageAccuracy: number;
  totalTimeSpent: number; // seconds
  totalPointsEarned: number;
  favoriteSubject?: string;
  strongestTopic?: string;
  weakestTopic?: string;
  lastActivity: Date;
  dailyGoalProgress: number;
  weeklyGoalProgress: number;
}

export interface Level {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  perks?: string[];
  icon?: string;
  color?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  rank: number;
  change: number; // position change from last update
  badges?: UserBadge[];
  streak?: number;
}

export interface LeaderboardType {
  type: 'daily' | 'weekly' | 'monthly' | 'all_time';
  subject?: string;
  grade?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  reward: AchievementReward;
}

export interface AchievementReward {
  xp?: number;
  points?: number;
  badgeId?: string;
  title?: string;
  perks?: string[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'streak' | 'accuracy' | 'speed';
  requirement: number;
  reward: number;
  expiresAt: Date;
  completed: boolean;
  progress: number;
}

export interface UserProgress {
  userId: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  rank: number;
  percentile: number;
  badges: UserBadge[];
  achievements: Achievement[];
  streaks: UserStreak;
  stats: UserStats;
  dailyChallenges: DailyChallenge[];
}