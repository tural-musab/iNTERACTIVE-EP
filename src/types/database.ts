// Database type definitions - Supabase şemasına tam uyumlu
export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin'
export type ContentType = 'lesson' | 'quiz'
export type PointReason = 'quiz_completion' | 'streak_bonus' | 'achievement' | 'daily_login' | 'speed_bonus' | 'perfect_score'
export type BadgeCategory = 'achievement' | 'streak' | 'quiz' | 'social'
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary'
export type StreakType = 'daily' | 'weekly' | 'quiz'

export interface Database {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          event_type: string
          event_data: any | null
          session_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_type: string
          event_data?: any | null
          session_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          event_type?: string
          event_data?: any | null
          session_id?: string | null
          created_at?: string | null
        }
      }
      content: {
        Row: {
          id: string
          title: string
          subject: string
          grade: number | null
          topic: string | null
          content_type: ContentType | null
          content_data: any
          created_at: string | null
          creator_id: string | null
        }
        Insert: {
          id?: string
          title: string
          subject?: string
          grade?: number | null
          topic?: string | null
          content_type?: ContentType | null
          content_data: any
          created_at?: string | null
          creator_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          subject?: string
          grade?: number | null
          topic?: string | null
          content_type?: ContentType | null
          content_data?: any
          created_at?: string | null
          creator_id?: string | null
        }
      }
      daily_leaderboard: {
        Row: {
          id: string
          user_id: string | null
          username: string
          avatar_url: string | null
          daily_points: number | null
          rank: number | null
          date: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          username: string
          avatar_url?: string | null
          daily_points?: number | null
          rank?: number | null
          date?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          username?: string
          avatar_url?: string | null
          daily_points?: number | null
          rank?: number | null
          date?: string | null
          created_at?: string | null
        }
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string | null
          student_id: string | null
          status: string | null
          invited_at: string | null
          confirmed_at: string | null
          invited_email: string | null
        }
        Insert: {
          id?: string
          parent_id?: string | null
          student_id?: string | null
          status?: string | null
          invited_at?: string | null
          confirmed_at?: string | null
          invited_email?: string | null
        }
        Update: {
          id?: string
          parent_id?: string | null
          student_id?: string | null
          status?: string | null
          invited_at?: string | null
          confirmed_at?: string | null
          invited_email?: string | null
        }
      }
      point_history: {
        Row: {
          id: string
          user_id: string | null
          points: number
          reason: PointReason
          quiz_id: string | null
          metadata: any | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          points: number
          reason: PointReason
          quiz_id?: string | null
          metadata?: any | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          points?: number
          reason?: PointReason
          quiz_id?: string | null
          metadata?: any | null
          created_at?: string | null
        }
      }
      quiz_assignments: {
        Row: {
          id: string
          created_at: string
          quiz_id: string
          assigned_to_user_id: string | null
          assigned_to_grade: number | null
          assigned_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          quiz_id: string
          assigned_to_user_id?: string | null
          assigned_to_grade?: number | null
          assigned_by: string
        }
        Update: {
          id?: string
          created_at?: string
          quiz_id?: string
          assigned_to_user_id?: string | null
          assigned_to_grade?: number | null
          assigned_by?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          student_id: string | null
          quiz_id: string | null
          score: number | null
          answers: any | null
          time_spent: number | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          quiz_id?: string | null
          score?: number | null
          answers?: any | null
          time_spent?: number | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          quiz_id?: string | null
          score?: number | null
          answers?: any | null
          time_spent?: number | null
          completed_at?: string | null
        }
      }
      teacher_applications: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          subjects: string[] | null
          experience: string | null
          status: string | null
          applied_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          phone?: string | null
          subjects?: string[] | null
          experience?: string | null
          status?: string | null
          applied_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          subjects?: string[] | null
          experience?: string | null
          status?: string | null
          applied_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      teacher_student_links: {
        Row: {
          id: string
          created_at: string
          teacher_id: string
          student_id: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          teacher_id: string
          student_id: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          teacher_id?: string
          student_id?: string
          status?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string | null
          badge_id: string
          badge_name: string
          badge_description: string | null
          badge_icon: string | null
          badge_category: BadgeCategory | null
          badge_rarity: BadgeRarity | null
          points_reward: number | null
          awarded_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          badge_id: string
          badge_name: string
          badge_description?: string | null
          badge_icon?: string | null
          badge_category?: BadgeCategory | null
          badge_rarity?: BadgeRarity | null
          points_reward?: number | null
          awarded_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          badge_id?: string
          badge_name?: string
          badge_description?: string | null
          badge_icon?: string | null
          badge_category?: BadgeCategory | null
          badge_rarity?: BadgeRarity | null
          points_reward?: number | null
          awarded_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string | null
          total_xp: number | null
          level: number | null
          avatar: string | null
          display_name: string | null
          bio: string | null
          created_at: string | null
          updated_at: string | null
          full_name: string | null
          email: string | null
          role: UserRole
          grade: number | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          total_xp?: number | null
          level?: number | null
          avatar?: string | null
          display_name?: string | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
          full_name?: string | null
          email?: string | null
          role?: UserRole
          grade?: number | null
        }
        Update: {
          id?: string
          user_id?: string | null
          total_xp?: number | null
          level?: number | null
          avatar?: string | null
          display_name?: string | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
          full_name?: string | null
          email?: string | null
          role?: UserRole
          grade?: number | null
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string | null
          total_quizzes_completed: number | null
          total_correct_answers: number | null
          total_incorrect_answers: number | null
          average_accuracy: number | null
          total_time_spent: number | null
          total_points_earned: number | null
          favorite_subject: string | null
          last_activity: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          total_quizzes_completed?: number | null
          total_correct_answers?: number | null
          total_incorrect_answers?: number | null
          average_accuracy?: number | null
          total_time_spent?: number | null
          total_points_earned?: number | null
          favorite_subject?: string | null
          last_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          total_quizzes_completed?: number | null
          total_correct_answers?: number | null
          total_incorrect_answers?: number | null
          average_accuracy?: number | null
          total_time_spent?: number | null
          total_points_earned?: number | null
          favorite_subject?: string | null
          last_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_streaks: {
        Row: {
          id: string
          user_id: string | null
          current_streak: number | null
          longest_streak: number | null
          last_activity_date: string | null
          streak_type: StreakType | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          current_streak?: number | null
          longest_streak?: number | null
          last_activity_date?: string | null
          streak_type?: StreakType | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          current_streak?: number | null
          longest_streak?: number | null
          last_activity_date?: string | null
          streak_type?: StreakType | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_level: {
        Args: {
          xp: number
        }
        Returns: number
      }
    }
    Enums: {
      user_role: UserRole
    }
  }
}

// Export individual table types for convenience
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']
export type Content = Database['public']['Tables']['content']['Row']
export type DailyLeaderboard = Database['public']['Tables']['daily_leaderboard']['Row']
export type ParentStudentLink = Database['public']['Tables']['parent_student_links']['Row']
export type PointHistory = Database['public']['Tables']['point_history']['Row']
export type QuizAssignment = Database['public']['Tables']['quiz_assignments']['Row']
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']
export type TeacherApplication = Database['public']['Tables']['teacher_applications']['Row']
export type TeacherStudentLink = Database['public']['Tables']['teacher_student_links']['Row']
export type UserBadge = Database['public']['Tables']['user_badges']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type UserStats = Database['public']['Tables']['user_stats']['Row']
export type UserStreak = Database['public']['Tables']['user_streaks']['Row']