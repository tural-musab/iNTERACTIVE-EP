import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import supabase from '../lib/supabaseClient';
import { PointSystem, PointTracker, StreakSystem, BadgeSystem, LevelSystem } from '../utils/gamification';

// Types
interface PointHistory {
  id: string;
  userId: string;
  points: number;
  reason: 'quiz_completion' | 'streak_bonus' | 'achievement' | 'daily_login' | 'speed_bonus' | 'perfect_score';
  quizId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'streak' | 'quiz' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointsReward: number;
  requirement: {
    type: string;
    value: number;
    condition: 'equals' | 'greater_than' | 'less_than';
  };
  earned?: boolean;
  awardedAt?: Date;
}

interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  level: number;
}

interface UserStats {
  totalQuizzesCompleted: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  averageAccuracy: number;
  totalTimeSpent: number;
  totalPointsEarned: number;
  favoriteSubject?: string;
  lastActivity: Date;
}

interface GamificationState {
  // User Data
  userId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Points System
  totalPoints: number;
  pointHistory: PointHistory[];
  
  // Streak System
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  streakType: 'daily' | 'weekly' | 'quiz';
  
  // Badge System
  badges: Badge[];
  earnedBadgeIds: string[];
  
  // Level System
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
  
  // User Stats
  userStats: UserStats | null;
  
  // UI State
  showBadgeNotification: boolean;
  lastEarnedBadge: Badge | null;
  showLevelUpNotification: boolean;
  lastLevelUp: number | null;
  
  // Actions
  initialize: (userId: string) => Promise<void>;
  addPoints: (points: number, reason: PointHistory['reason'], metadata?: Record<string, any>) => Promise<void>;
  updateStreak: (activityType: 'quiz' | 'login') => Promise<void>;
  checkAndAwardBadges: () => Promise<void>;
  loadLeaderboard: (category?: string) => Promise<void>;
  loadUserStats: () => Promise<void>;
  resetNotifications: () => void;
  clearError: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        userId: null,
        isLoading: false,
        error: null,
        
        // Points System
        totalPoints: 0,
        pointHistory: [],
        
        // Streak System
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        streakType: 'daily',
        
        // Badge System
        badges: [],
        earnedBadgeIds: [],
        
        // Level System
        level: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        totalXP: 0,
        
        // Leaderboard
        leaderboard: [],
        userRank: null,
        
        // User Stats
        userStats: null,
        
        // UI State
        showBadgeNotification: false,
        lastEarnedBadge: null,
        showLevelUpNotification: false,
        lastLevelUp: null,

        // Actions
        initialize: async (userId: string) => {
          set({ isLoading: true, error: null, userId });
          
          try {
            // Load all gamification data in parallel
            await Promise.all([
              get().loadUserStats(),
              get().loadLeaderboard(),
              get().loadBadges(),
              get().loadStreakData(),
              get().loadPointHistory()
            ]);
            
            // Check for badges after loading data
            await get().checkAndAwardBadges();
            
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Gamification verileri yüklenirken hata oluştu' });
          } finally {
            set({ isLoading: false });
          }
        },

        addPoints: async (points: number, reason: PointHistory['reason'], metadata?: Record<string, any>) => {
          const { userId } = get();
          if (!userId) return;

          try {
            // Add points to database
            await PointTracker.addPoints(userId, points, reason, metadata);
            
            // Update local state
            const newTotalPoints = get().totalPoints + points;
            const newTotalXP = get().totalXP + points;
            
            // Calculate new level
            const newLevelData = LevelSystem.calculateLevel(newTotalXP);
            
            // Check if level up
            const oldLevel = get().level;
            const newLevel = newLevelData.level;
            
            // Update user_profiles table
            const { error: profileError } = await supabase
              .from('user_profiles')
              .update({
                total_xp: newTotalXP,
                level: newLevel,
                updated_at: new Date()
              })
              .eq('user_id', userId);

            if (profileError) throw profileError;
            
            set(state => ({
              totalPoints: newTotalPoints,
              totalXP: newTotalXP,
              level: newLevel,
              currentXP: newLevelData.currentXP,
              xpToNextLevel: newLevelData.xpToNextLevel,
              pointHistory: [
                {
                  id: Date.now().toString(),
                  userId,
                  points,
                  reason,
                  metadata,
                  createdAt: new Date()
                },
                ...state.pointHistory
              ]
            }));

            // Show level up notification
            if (newLevel > oldLevel) {
              set({
                showLevelUpNotification: true,
                lastLevelUp: newLevel
              });
            }

            // Update leaderboard
            await get().loadLeaderboard();
            
          } catch (error) {
            set({ error: 'Puan eklenirken hata oluştu' });
          }
        },

        updateStreak: async (activityType: 'quiz' | 'login') => {
          const { userId } = get();
          if (!userId) return;

          try {
            await StreakSystem.updateStreak(userId, activityType);
            
            // Reload streak data
            await get().loadStreakData();
            
          } catch (error) {
            set({ error: 'Streak güncellenirken hata oluştu' });
          }
        },

        checkAndAwardBadges: async () => {
          const { userId } = get();
          if (!userId) return;

          try {
            await BadgeSystem.checkAndAwardBadges(userId);
            
            // Reload badges
            await get().loadBadges();
            
          } catch (error) {
            set({ error: 'Rozet kontrolü yapılırken hata oluştu' });
          }
        },

        loadLeaderboard: async (category: string = 'daily') => {
          try {
            const { data, error } = await supabase
              .from('daily_leaderboard')
              .select('*')
              .eq('date', new Date().toISOString().split('T')[0])
              .order('daily_points', { ascending: false })
              .limit(10);

            if (error) throw error;

            const leaderboard: LeaderboardEntry[] = data?.map((entry, index) => ({
              userId: entry.user_id,
              username: entry.username,
              avatar: entry.avatar_url,
              score: entry.daily_points,
              rank: index + 1,
              level: 1 // TODO: Get from users table
            })) || [];

            // Find user rank
            const userRank = leaderboard.findIndex(entry => entry.userId === get().userId) + 1;

            set({ leaderboard, userRank: userRank > 0 ? userRank : null });
            
          } catch (error) {
            set({ error: 'Liderlik tablosu yüklenirken hata oluştu' });
          }
        },

        loadUserStats: async () => {
          const { userId } = get();
          if (!userId) return;

          try {
            // Load user profile data
            const { data: profileData, error: profileError } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', userId)
              .single();

            if (profileError) throw profileError;

            // Load user stats data
            const { data: statsData, error: statsError } = await supabase
              .from('user_stats')
              .select('*')
              .eq('user_id', userId)
              .single();

            if (statsError && statsError.code !== 'PGRST116') throw statsError; // PGRST116 = no rows returned

            // Update state with profile data
            if (profileData) {
              set({
                totalXP: profileData.total_xp,
                level: profileData.level,
                currentXP: 0, // Will be calculated
                xpToNextLevel: 100 // Will be calculated
              });
            }

            // Update state with stats data
            if (statsData) {
              set({
                userStats: {
                  totalQuizzesCompleted: statsData.total_quizzes_completed,
                  totalCorrectAnswers: statsData.total_correct_answers,
                  totalIncorrectAnswers: statsData.total_incorrect_answers,
                  averageAccuracy: statsData.average_accuracy,
                  totalTimeSpent: statsData.total_time_spent,
                  totalPointsEarned: statsData.total_points_earned,
                  favoriteSubject: statsData.favorite_subject,
                  lastActivity: new Date(statsData.last_activity)
                }
              });
            }
            
          } catch (error) {
            set({ error: 'Kullanıcı verileri yüklenirken hata oluştu' });
          }
        },

        loadBadges: async () => {
          const { userId } = get();
          if (!userId) return;

          try {
            // Load all available badges
            const { data: allBadges, error: badgesError } = await supabase
              .from('user_badges')
              .select('*')
              .is('user_id', null); // System badges

            if (badgesError) throw badgesError;

            // Load user's earned badges
            const { data: userBadges, error: userBadgesError } = await supabase
              .from('user_badges')
              .select('*')
              .eq('user_id', userId);

            if (userBadgesError) throw userBadgesError;

            const earnedBadgeIds = userBadges?.map(badge => badge.badge_id) || [];
            
            const badges: Badge[] = allBadges?.map(badge => ({
              id: badge.badge_id,
              name: badge.badge_name,
              description: badge.badge_description,
              icon: badge.badge_icon,
              category: badge.badge_category,
              rarity: badge.badge_rarity,
              pointsReward: badge.points_reward,
              requirement: { type: 'unknown', value: 0, condition: 'equals' }, // TODO: Add requirement data
              earned: earnedBadgeIds.includes(badge.badge_id),
              awardedAt: userBadges?.find(ub => ub.badge_id === badge.badge_id)?.awarded_at
            })) || [];

            set({ badges, earnedBadgeIds });
            
          } catch (error) {
            set({ error: 'Rozetler yüklenirken hata oluştu' });
          }
        },

        loadStreakData: async () => {
          const { userId } = get();
          if (!userId) return;

          try {
            const { data, error } = await supabase
              .from('user_streaks')
              .select('*')
              .eq('user_id', userId)
              .single();

            if (error) throw error;

            if (data) {
              set({
                currentStreak: data.current_streak,
                longestStreak: data.longest_streak,
                lastActivityDate: new Date(data.last_activity_date),
                streakType: data.streak_type
              });
            }
            
          } catch (error) {
            set({ error: 'Streak verileri yüklenirken hata oluştu' });
          }
        },

        loadPointHistory: async () => {
          const { userId } = get();
          if (!userId) return;

          try {
            const { data, error } = await supabase
              .from('point_history')
              .select('*')
              .eq('user_id', userId)
              .order('created_at', { ascending: false })
              .limit(50);

            if (error) throw error;

            const pointHistory: PointHistory[] = data?.map(entry => ({
              id: entry.id,
              userId: entry.user_id,
              points: entry.points,
              reason: entry.reason,
              quizId: entry.quiz_id,
              metadata: entry.metadata,
              createdAt: new Date(entry.created_at)
            })) || [];

            const totalPoints = pointHistory.reduce((sum, entry) => sum + entry.points, 0);

            set({ pointHistory, totalPoints });
            
          } catch (error) {
            set({ error: 'Puan geçmişi yüklenirken hata oluştu' });
          }
        },

        resetNotifications: () => {
          set({
            showBadgeNotification: false,
            lastEarnedBadge: null,
            showLevelUpNotification: false,
            lastLevelUp: null
          });
        },

        clearError: () => {
          set({ error: null });
        }
      }),
      {
        name: 'gamification-store',
        partialize: (state) => ({
          userId: state.userId,
          totalPoints: state.totalPoints,
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          level: state.level,
          totalXP: state.totalXP,
          earnedBadgeIds: state.earnedBadgeIds
        })
      }
    )
  )
);

// Utility selectors
export const useGamificationStats = () => {
  const { totalPoints, level, currentStreak, badges, userStats } = useGamificationStore();
  
  return {
    totalPoints,
    level,
    currentStreak,
    totalBadges: badges.length,
    earnedBadges: badges.filter(b => b.earned).length,
    userStats
  };
};

export const useGamificationNotifications = () => {
  const { showBadgeNotification, lastEarnedBadge, showLevelUpNotification, lastLevelUp, resetNotifications } = useGamificationStore();
  
  return {
    showBadgeNotification,
    lastEarnedBadge,
    showLevelUpNotification,
    lastLevelUp,
    resetNotifications
  };
};
