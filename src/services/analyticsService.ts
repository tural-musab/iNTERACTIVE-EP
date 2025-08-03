import supabase from '../lib/supabaseClient';

// Types
export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: 'quiz_started' | 'quiz_completed' | 'question_answered' | 'lesson_started' | 'lesson_completed';
  eventData: Record<string, any>;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface QuizAnalytics {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficulty: string;
  subject: string;
  completedAt: Date;
}

export interface UserPerformance {
  userId: string;
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  favoriteSubject: string;
  improvementRate: number;
  lastActivity: Date;
}

export interface SubjectPerformance {
  subject: string;
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface WeeklyProgress {
  week: string;
  quizzesCompleted: number;
  averageScore: number;
  timeSpent: number;
  improvement: number;
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  subject?: string;
  difficulty?: string;
  userId?: string;
}

class AnalyticsService {
  // Event Tracking
  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: event.userId,
          event_type: event.eventType,
          event_data: event.eventData,
          metadata: event.metadata,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Analytics event tracking error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to track analytics event:', error);
      // Don't throw error to prevent breaking user experience
    }
  }

  // Quiz Analytics
  async saveQuizResult(quizData: Omit<QuizAnalytics, 'id'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('quiz_analytics')
        .insert({
          user_id: quizData.userId,
          quiz_id: quizData.quizId,
          score: quizData.score,
          total_questions: quizData.totalQuestions,
          correct_answers: quizData.correctAnswers,
          time_spent: quizData.timeSpent,
          difficulty: quizData.difficulty,
          subject: quizData.subject,
          completed_at: quizData.completedAt.toISOString()
        });

      if (error) {
        console.error('Quiz analytics save error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to save quiz result:', error);
      throw error;
    }
  }

  // User Performance
  async getUserPerformance(userId: string, filters?: AnalyticsFilters): Promise<UserPerformance> {
    try {
      let query = supabase
        .from('quiz_analytics')
        .select('*')
        .eq('user_id', userId);

      if (filters?.dateRange) {
        query = query
          .gte('completed_at', filters.dateRange.start.toISOString())
          .lte('completed_at', filters.dateRange.end.toISOString());
      }

      if (filters?.subject) {
        query = query.eq('subject', filters.subject);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get user performance error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return {
          userId,
          totalQuizzes: 0,
          averageScore: 0,
          totalTimeSpent: 0,
          favoriteSubject: '',
          improvementRate: 0,
          lastActivity: new Date()
        };
      }

      const totalQuizzes = data.length;
      const totalScore = data.reduce((sum, quiz) => sum + quiz.score, 0);
      const averageScore = totalScore / totalQuizzes;
      const totalTimeSpent = data.reduce((sum, quiz) => sum + quiz.time_spent, 0);

      // Calculate favorite subject
      const subjectCounts = data.reduce((acc, quiz) => {
        acc[quiz.subject] = (acc[quiz.subject] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const favoriteSubject = Object.entries(subjectCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || '';

      // Calculate improvement rate (comparing first and last 5 quizzes)
      let improvementRate = 0;
      if (data.length >= 10) {
        const sortedData = data.sort((a, b) => 
          new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()
        );
        
        const first5Avg = sortedData.slice(0, 5).reduce((sum, quiz) => sum + quiz.score, 0) / 5;
        const last5Avg = sortedData.slice(-5).reduce((sum, quiz) => sum + quiz.score, 0) / 5;
        
        improvementRate = ((last5Avg - first5Avg) / first5Avg) * 100;
      }

      const lastActivity = new Date(Math.max(...data.map(quiz => new Date(quiz.completed_at).getTime())));

      return {
        userId,
        totalQuizzes,
        averageScore: Math.round(averageScore * 100) / 100,
        totalTimeSpent,
        favoriteSubject,
        improvementRate: Math.round(improvementRate * 100) / 100,
        lastActivity
      };
    } catch (error) {
      console.error('Failed to get user performance:', error);
      throw error;
    }
  }

  // Subject Performance
  async getSubjectPerformance(userId: string, filters?: AnalyticsFilters): Promise<SubjectPerformance[]> {
    try {
      let query = supabase
        .from('quiz_analytics')
        .select('*')
        .eq('user_id', userId);

      if (filters?.dateRange) {
        query = query
          .gte('completed_at', filters.dateRange.start.toISOString())
          .lte('completed_at', filters.dateRange.end.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get subject performance error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Group by subject
      const subjectGroups = data.reduce((acc, quiz) => {
        if (!acc[quiz.subject]) {
          acc[quiz.subject] = [];
        }
        acc[quiz.subject].push(quiz);
        return acc;
      }, {} as Record<string, any[]>);

      return Object.entries(subjectGroups).map(([subject, quizzes]) => {
        const totalQuizzes = quizzes.length;
        const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
        const averageScore = totalScore / totalQuizzes;
        const totalTimeSpent = quizzes.reduce((sum, quiz) => sum + quiz.time_spent, 0);

        const difficultyBreakdown = quizzes.reduce((acc, quiz) => {
          acc[quiz.difficulty] = (acc[quiz.difficulty] || 0) + 1;
          return acc;
        }, { easy: 0, medium: 0, hard: 0 } as Record<string, number>);

        return {
          subject,
          totalQuizzes,
          averageScore: Math.round(averageScore * 100) / 100,
          totalTimeSpent,
          difficultyBreakdown
        };
      });
    } catch (error) {
      console.error('Failed to get subject performance:', error);
      throw error;
    }
  }

  // Weekly Progress
  async getWeeklyProgress(userId: string, weeks: number = 8): Promise<WeeklyProgress[]> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (weeks * 7));

      const { data, error } = await supabase
        .from('quiz_analytics')
        .select('*')
        .eq('user_id', userId)
        .gte('completed_at', startDate.toISOString())
        .lte('completed_at', endDate.toISOString())
        .order('completed_at', { ascending: true });

      if (error) {
        console.error('Get weekly progress error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Group by week
      const weeklyGroups: Record<string, any[]> = {};
      
      data.forEach(quiz => {
        const quizDate = new Date(quiz.completed_at);
        const weekStart = new Date(quizDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week (Sunday)
        
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeklyGroups[weekKey]) {
          weeklyGroups[weekKey] = [];
        }
        weeklyGroups[weekKey].push(quiz);
      });

      return Object.entries(weeklyGroups).map(([week, quizzes]) => {
        const totalQuizzes = quizzes.length;
        const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
        const averageScore = totalScore / totalQuizzes;
        const totalTimeSpent = quizzes.reduce((sum, quiz) => sum + quiz.time_spent, 0);

        return {
          week,
          quizzesCompleted: totalQuizzes,
          averageScore: Math.round(averageScore * 100) / 100,
          timeSpent: totalTimeSpent,
          improvement: 0 // Will be calculated in comparison
        };
      }).sort((a, b) => a.week.localeCompare(b.week));
    } catch (error) {
      console.error('Failed to get weekly progress:', error);
      throw error;
    }
  }

  // Leaderboard
  async getLeaderboard(limit: number = 10, subject?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('quiz_analytics')
        .select(`
          user_id,
          score,
          total_questions,
          subject,
          completed_at,
          users:user_profiles(full_name, avatar)
        `)
        .order('score', { ascending: false })
        .limit(limit);

      if (subject) {
        query = query.eq('subject', subject);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get leaderboard error:', error);
        throw error;
      }

      if (!data) return [];

      // Group by user and calculate average scores
      const userScores = data.reduce((acc, quiz) => {
        if (!acc[quiz.user_id]) {
          acc[quiz.user_id] = {
            userId: quiz.user_id,
            username: quiz.users?.full_name || 'Anonymous',
            avatar: quiz.users?.avatar,
            totalScore: 0,
            totalQuizzes: 0,
            averageScore: 0
          };
        }
        
        acc[quiz.user_id].totalScore += quiz.score;
        acc[quiz.user_id].totalQuizzes += 1;
        acc[quiz.user_id].averageScore = acc[quiz.user_id].totalScore / acc[quiz.user_id].totalQuizzes;
        
        return acc;
      }, {} as Record<string, any>);

      return Object.values(userScores)
        .sort((a, b) => b.averageScore - a.averageScore)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
          averageScore: Math.round(user.averageScore * 100) / 100
        }));
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      throw error;
    }
  }

  // Export Analytics Data
  async exportAnalyticsData(userId: string, format: 'json' | 'csv' = 'json'): Promise<string> {
    try {
      const [userPerformance, subjectPerformance, weeklyProgress] = await Promise.all([
        this.getUserPerformance(userId),
        this.getSubjectPerformance(userId),
        this.getWeeklyProgress(userId)
      ]);

      const exportData = {
        userPerformance,
        subjectPerformance,
        weeklyProgress,
        exportDate: new Date().toISOString(),
        userId
      };

      if (format === 'csv') {
        // Convert to CSV format
        return this.convertToCSV(exportData);
      }

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Failed to export analytics data:', error);
      throw error;
    }
  }

  private convertToCSV(data: any): string {
    // Simple CSV conversion for analytics data
    const csvRows = [];
    
    // User Performance
    csvRows.push(['User Performance']);
    csvRows.push(['Metric', 'Value']);
    csvRows.push(['Total Quizzes', data.userPerformance.totalQuizzes]);
    csvRows.push(['Average Score', data.userPerformance.averageScore]);
    csvRows.push(['Total Time Spent', data.userPerformance.totalTimeSpent]);
    csvRows.push(['Favorite Subject', data.userPerformance.favoriteSubject]);
    csvRows.push(['Improvement Rate', data.userPerformance.improvementRate]);
    csvRows.push([]);

    // Subject Performance
    csvRows.push(['Subject Performance']);
    csvRows.push(['Subject', 'Total Quizzes', 'Average Score', 'Total Time Spent']);
    data.subjectPerformance.forEach((subject: any) => {
      csvRows.push([
        subject.subject,
        subject.totalQuizzes,
        subject.averageScore,
        subject.totalTimeSpent
      ]);
    });

    return csvRows.map(row => row.join(',')).join('\n');
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();

// Convenience functions
export const trackQuizEvent = (userId: string, eventType: AnalyticsEvent['eventType'], eventData: Record<string, any>) => {
  return analyticsService.trackEvent({
    userId,
    eventType,
    eventData
  });
};

export const saveQuizResult = (quizData: Omit<QuizAnalytics, 'id'>) => {
  return analyticsService.saveQuizResult(quizData);
};

export const getUserPerformance = (userId: string, filters?: AnalyticsFilters) => {
  return analyticsService.getUserPerformance(userId, filters);
};

export const getSubjectPerformance = (userId: string, filters?: AnalyticsFilters) => {
  return analyticsService.getSubjectPerformance(userId, filters);
};

export const getWeeklyProgress = (userId: string, weeks?: number) => {
  return analyticsService.getWeeklyProgress(userId, weeks);
};

export const getLeaderboard = (limit?: number, subject?: string) => {
  return analyticsService.getLeaderboard(limit, subject);
};

export const exportAnalyticsData = (userId: string, format?: 'json' | 'csv') => {
  return analyticsService.exportAnalyticsData(userId, format);
};
