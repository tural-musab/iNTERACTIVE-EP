// Analytics Types
export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: 'quiz_started' | 'quiz_completed' | 'question_answered' | 'lesson_started' | 'lesson_completed';
  eventData: Record<string, any>;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface QuizAnalytics {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  completedAt: Date;
  mode: 'practice' | 'test' | 'review';
}

export interface UserPerformance {
  userId: string;
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  favoriteSubject: string;
  improvementRate: number;
  lastActivity: Date;
  consistency: number;
  engagementScore: number;
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
  improvementRate: number;
  lastQuizDate: Date;
}

export interface WeeklyProgress {
  week: string;
  quizzesCompleted: number;
  averageScore: number;
  timeSpent: number;
  improvement: number;
  subjects: string[];
}

export interface MonthlyProgress {
  month: string;
  quizzesCompleted: number;
  averageScore: number;
  totalTimeSpent: number;
  improvement: number;
  newSubjects: string[];
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  userId?: string;
  mode?: 'practice' | 'test' | 'review';
}

export interface PerformanceInsight {
  type: 'positive' | 'negative' | 'neutral';
  message: string;
  metric: string;
  value: number;
  change?: number;
  icon: string;
}

export interface StudyRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'subject' | 'time' | 'method' | 'consistency';
  title: string;
  description: string;
  actionItems: string[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'radar' | 'doughnut';
  data: ChartDataPoint[];
  options?: {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    scales?: any;
    plugins?: any;
  };
}

export interface AnalyticsSummary {
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  improvementRate: number;
  consistency: number;
  engagementScore: number;
  favoriteSubject: string;
  bestPerformance: {
    subject: string;
    score: number;
    date: Date;
  };
  needsImprovement: {
    subject: string;
    score: number;
    recommendations: string[];
  };
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  level: number;
  totalQuizzes: number;
  averageScore: number;
  improvementRate: number;
}

export interface AnalyticsExport {
  userPerformance: UserPerformance;
  subjectPerformance: SubjectPerformance[];
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
  insights: PerformanceInsight[];
  recommendations: StudyRecommendation[];
  summary: AnalyticsSummary;
  exportDate: Date;
  exportFormat: 'json' | 'csv' | 'pdf';
}

// Chart specific types
export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface RadarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

// Performance tracking types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target?: number;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  subject: string;
  activities: {
    type: 'quiz' | 'lesson' | 'review';
    duration: number;
    score?: number;
  }[];
  efficiency: number;
}

export interface LearningPath {
  id: string;
  userId: string;
  subject: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  nextMilestone: {
    level: number;
    requirements: string[];
    estimatedTime: number;
  };
  completedTopics: string[];
  recommendedTopics: string[];
}

// Analytics dashboard types
export interface AnalyticsDashboard {
  summary: AnalyticsSummary;
  recentActivity: QuizAnalytics[];
  performanceTrends: ChartDataPoint[];
  subjectBreakdown: SubjectPerformance[];
  insights: PerformanceInsight[];
  recommendations: StudyRecommendation[];
  leaderboard: LeaderboardEntry[];
  weeklyProgress: WeeklyProgress[];
}

// Real-time analytics types
export interface RealTimeMetrics {
  activeUsers: number;
  quizzesInProgress: number;
  averageSessionDuration: number;
  popularSubjects: string[];
  systemPerformance: {
    responseTime: number;
    errorRate: number;
    uptime: number;
  };
}

// Comparative analytics types
export interface ComparativeAnalysis {
  userPerformance: UserPerformance;
  peerComparison: {
    percentile: number;
    averagePeerScore: number;
    topPerformers: LeaderboardEntry[];
  };
  classComparison?: {
    classAverage: number;
    classRank: number;
    totalStudents: number;
  };
  historicalComparison: {
    previousPeriod: UserPerformance;
    improvement: number;
    trend: 'improving' | 'declining' | 'stable';
  };
} 