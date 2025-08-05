import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import supabase from '../lib/supabaseClient';
import { PointSystem, PointTracker, StreakSystem, BadgeSystem, LevelSystem } from '../utils/gamification';
import { 
  logError, 
  getErrorMessage, 
  DatabaseError, 
  AuthenticationError,
  handleAsync,
  retryAsync
} from '../utils/errorHandler';
import type { 
  PointHistory as DatabasePointHistory,
  UserBadge as DatabaseUserBadge,
  DailyLeaderboard,
  UserStats as DatabaseUserStats,
  UserStreak as DatabaseUserStreak,
  UserProfile,
  PointReason,
  BadgeCategory,
  BadgeRarity,
  StreakType
} from '../types/database';

// Database ile uyumlu types
interface PointHistory extends Omit<DatabasePointHistory, 'created_at'> {
  createdAt: Date;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  pointsReward: number;
  requirement: {
    type: string;
    value: number;
    condition: 'equals' | 'greater_than' | 'less_than';
  };
  earned?: boolean;
  awardedAt?: Date;
}

interface LeaderboardEntry extends Omit<DailyLeaderboard, 'user_id' | 'daily_points'> {
  userId: string;
  score: number;
  level: number;
}

interface UserStats extends Omit<DatabaseUserStats, 'last_activity' | 'created_at' | 'updated_at'> {
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
  streakType: StreakType;
  
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
  addPoints: (points: number, reason: PointReason, metadata?: Record<string, unknown>) => Promise<void>;
  updateStreak: (activityType: 'quiz' | 'login') => Promise<void>;
  checkAndAwardBadges: () => Promise<void>;
  loadLeaderboard: (category?: string) => Promise<void>;
  loadUserStats: () => Promise<void>;
  loadBadges: () => Promise<void>;
  loadStreakData: () => Promise<void>;
  loadPointHistory: () => Promise<void>;
  resetNotifications: () => void;
  clearError: () => void;
  setupRealtimeSubscriptions: () => void;
  cleanup: () => void;
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
        initialize: handleAsync(async (userId: string) => {
          if (!userId) {
            throw new AuthenticationError('Kullanıcı ID gerekli');
          }

          set({ isLoading: true, error: null, userId });
          
          try {
            // Load all gamification data in parallel with retry logic
            await retryAsync(async () => {
              await Promise.all([
                get().loadUserStats(),
                get().loadLeaderboard(),
                get().loadBadges(),
                get().loadStreakData(),
                get().loadPointHistory()
              ]);
            }, 2, 1000);
            
            // Check for badges after loading data
            await get().checkAndAwardBadges();
            
            // Setup real-time subscriptions
            get().setupRealtimeSubscriptions();
            
          } catch (error) {
            const errorMessage = getErrorMessage(error);
            logError(error as Error, { 
              action: 'gamification_initialize', 
              userId,
              timestamp: new Date().toISOString()
            });
            set({ error: errorMessage });
            throw new DatabaseError(`Gamification initialization failed: ${errorMessage}`);
          } finally {
            set({ isLoading: false });
          }
        }),

        addPoints: async (points: number, reason: PointReason, metadata?: Record<string, unknown>) => {
          const { userId } = get();
          if (!userId) return;

          try {
            // NOT: Artık doğrudan veritabanına yazmıyoruz
            // Puanlar Edge Function tarafından güvenli şekilde veriliyor
            // Bu fonksiyon sadece UI güncellemesi için kullanılıyor
            
            // Local state güncelle
            const newTotalPoints = get().totalPoints + points;
            const newTotalXP = get().totalXP + points;
            
            // Calculate new level
            const newLevelData = LevelSystem.calculateLevel(newTotalXP);
            
            // Check if level up
            const oldLevel = get().level;
            const newLevel = newLevelData.level;
            
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
              userId: entry.user_id as string,
              username: entry.username as string,
              avatar: entry.avatar_url as string | undefined,
              score: entry.daily_points as number,
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

        loadUserStats: handleAsync(async () => {
          const { userId } = get();
          if (!userId) {
            throw new AuthenticationError('Kullanıcı oturum bilgisi bulunamadı');
          }

          try {
            // Load user profile data with retry
            const profileData = await retryAsync(async () => {
              const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

              if (error && error.code !== 'PGRST116') {
                throw new DatabaseError(`Profile yüklenirken hata: ${error.message}`, { userId, error });
              }
              return data;
            });

            // Load user stats data with retry
            const statsData = await retryAsync(async () => {
              const { data, error } = await supabase
                .from('user_stats')
                .select('*')
                .eq('user_id', userId)
                .single();

              if (error && error.code !== 'PGRST116') {
                throw new DatabaseError(`Stats yüklenirken hata: ${error.message}`, { userId, error });
              }
              return data;
            });

            // Update state with profile data
            if (profileData) {
              set({
                totalXP: (profileData.total_xp as number) || 0,
                level: (profileData.level as number) || 1,
                currentXP: 0, // Will be calculated
                xpToNextLevel: 100 // Will be calculated
              });
            } else {
              // Varsayılan profil değerleri
              set({
                totalXP: 0,
                level: 1,
                currentXP: 0,
                xpToNextLevel: 100
              });
            }

            // Update state with stats data
            if (statsData) {
              set({
                userStats: {
                  totalQuizzesCompleted: (statsData.total_quizzes_completed as number) || 0,
                  totalCorrectAnswers: (statsData.total_correct_answers as number) || 0,
                  totalIncorrectAnswers: (statsData.total_incorrect_answers as number) || 0,
                  averageAccuracy: (statsData.average_accuracy as number) || 0,
                  totalTimeSpent: (statsData.total_time_spent as number) || 0,
                  totalPointsEarned: (statsData.total_points_earned as number) || 0,
                  favoriteSubject: (statsData.favorite_subject as string) || null,
                  lastActivity: statsData.last_activity ? new Date(statsData.last_activity as string) : new Date()
                }
              });
            } else {
              // Varsayılan stats değerleri
              set({
                userStats: {
                  totalQuizzesCompleted: 0,
                  totalCorrectAnswers: 0,
                  totalIncorrectAnswers: 0,
                  averageAccuracy: 0,
                  totalTimeSpent: 0,
                  totalPointsEarned: 0,
                  favoriteSubject: null,
                  lastActivity: new Date()
                }
              });
            }
            
          } catch (error) {
            const errorMessage = getErrorMessage(error);
            logError(error as Error, { 
              action: 'load_user_stats', 
              userId,
              timestamp: new Date().toISOString()
            });
            set({ error: errorMessage });
            throw error;
          }
        }),

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

            if (error && error.code !== 'PGRST116') {
              console.error('Streak data error:', error);
              throw error;
            }

            if (data) {
              set({
                currentStreak: data.current_streak || 0,
                longestStreak: data.longest_streak || 0,
                lastActivityDate: data.last_activity_date ? new Date(data.last_activity_date) : null,
                streakType: data.streak_type || 'daily'
              });
            } else {
              // Kullanıcının streak kaydı yoksa varsayılan değerler
              set({
                currentStreak: 0,
                longestStreak: 0,
                lastActivityDate: null,
                streakType: 'daily'
              });
            }
            
          } catch (error) {
            console.error('Streak data loading error:', error);
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
        },

        setupRealtimeSubscriptions: () => {
          const { userId } = get();
          if (!userId) return;

          // Subscribe to user stats changes
          supabase
            .channel('user_stats')
            .on('postgres_changes', 
              { 
                event: 'UPDATE', 
                schema: 'public', 
                table: 'user_stats',
                filter: `user_id=eq.${userId}`
              }, 
              (payload) => {
                const updatedStats = payload.new as DatabaseUserStats;
                set({
                  userStats: {
                    ...updatedStats,
                    lastActivity: new Date(updatedStats.last_activity || new Date())
                  }
                });
              }
            )
            .subscribe();

          // Subscribe to user profile changes (XP, level)
          supabase
            .channel('user_profile')
            .on('postgres_changes',
              {
                event: 'UPDATE',
                schema: 'public', 
                table: 'user_profiles',
                filter: `user_id=eq.${userId}`
              },
              (payload) => {
                const updatedProfile = payload.new as UserProfile;
                const newTotalXP = updatedProfile.total_xp || 0;
                const newLevel = updatedProfile.level || 1;
                
                set({
                  totalXP: newTotalXP,
                  level: newLevel,
                  currentXP: newTotalXP % 100, // Simplified calculation
                  xpToNextLevel: 100 - (newTotalXP % 100)
                });
              }
            )
            .subscribe();

          // Subscribe to point history changes
          supabase
            .channel('point_history')
            .on('postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'point_history', 
                filter: `user_id=eq.${userId}`
              },
              (payload) => {
                const newPoint = payload.new as DatabasePointHistory;
                const pointEntry: PointHistory = {
                  ...newPoint,
                  createdAt: new Date(newPoint.created_at || new Date())
                };
                
                set(state => ({
                  pointHistory: [pointEntry, ...state.pointHistory].slice(0, 50),
                  totalPoints: state.totalPoints + newPoint.points
                }));
              }
            )
            .subscribe();

          // Subscribe to user badges changes
          supabase
            .channel('user_badges')
            .on('postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'user_badges',
                filter: `user_id=eq.${userId}`
              },
              (payload) => {
                const newBadge = payload.new as DatabaseUserBadge;
                set(state => ({
                  earnedBadgeIds: [...state.earnedBadgeIds, newBadge.badge_id],
                  badges: state.badges.map(badge => 
                    badge.id === newBadge.badge_id 
                      ? { ...badge, earned: true, awardedAt: new Date(newBadge.awarded_at || new Date()) }
                      : badge
                  ),
                  showBadgeNotification: true,
                  lastEarnedBadge: state.badges.find(b => b.id === newBadge.badge_id) || null
                }));
              }
            )
            .subscribe();

          // Subscribe to user streaks changes
          supabase
            .channel('user_streaks')
            .on('postgres_changes',
              {
                event: 'UPDATE',
                schema: 'public',
                table: 'user_streaks',
                filter: `user_id=eq.${userId}`
              },
              (payload) => {
                const updatedStreak = payload.new as DatabaseUserStreak;
                set({
                  currentStreak: updatedStreak.current_streak || 0,
                  longestStreak: updatedStreak.longest_streak || 0,
                  lastActivityDate: updatedStreak.last_activity_date ? new Date(updatedStreak.last_activity_date) : null,
                  streakType: updatedStreak.streak_type || 'daily'
                });
              }
            )
            .subscribe();

          // Subscribe to daily leaderboard changes
          supabase
            .channel('daily_leaderboard')
            .on('postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'daily_leaderboard'
              },
              () => {
                // Reload leaderboard when any change occurs
                get().loadLeaderboard();
              }
            )
            .subscribe();
        },

        cleanup: () => {
          // Remove all subscriptions
          supabase.removeAllChannels();
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
