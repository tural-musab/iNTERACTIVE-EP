import { UserPerformance, SubjectPerformance, WeeklyProgress } from '../services/analyticsService';

// Analytics calculation utilities
export class AnalyticsUtils {
  // Calculate percentage change between two values
  static calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
  }

  // Calculate trend direction
  static getTrendDirection(change: number): 'up' | 'down' | 'stable' {
    if (change > 5) return 'up';
    if (change < -5) return 'down';
    return 'stable';
  }

  // Format time in minutes to human readable format
  static formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${Math.round(minutes)} dakika`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours} saat ${remainingMinutes} dakika`;
  }

  // Calculate average from array of numbers
  static calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return Math.round((sum / numbers.length) * 100) / 100;
  }

  // Calculate median from array of numbers
  static calculateMedian(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }

  // Calculate standard deviation
  static calculateStandardDeviation(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const mean = this.calculateAverage(numbers);
    const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    const variance = this.calculateAverage(squaredDifferences);
    return Math.sqrt(variance);
  }

  // Get performance grade based on score
  static getPerformanceGrade(score: number): { grade: string; color: string; description: string } {
    if (score >= 90) {
      return { grade: 'A+', color: '#10B981', description: 'Mükemmel' };
    } else if (score >= 80) {
      return { grade: 'A', color: '#059669', description: 'Çok İyi' };
    } else if (score >= 70) {
      return { grade: 'B', color: '#3B82F6', description: 'İyi' };
    } else if (score >= 60) {
      return { grade: 'C', color: '#F59E0B', description: 'Orta' };
    } else if (score >= 50) {
      return { grade: 'D', color: '#EF4444', description: 'Geliştirilmeli' };
    } else {
      return { grade: 'F', color: '#DC2626', description: 'Başarısız' };
    }
  }

  // Calculate study efficiency (score per minute)
  static calculateStudyEfficiency(score: number, timeSpent: number): number {
    if (timeSpent === 0) return 0;
    return Math.round((score / timeSpent) * 100) / 100;
  }

  // Get difficulty level based on score and time
  static getDifficultyLevel(score: number, timeSpent: number, averageTime: number): 'easy' | 'medium' | 'hard' {
    const timeRatio = timeSpent / averageTime;
    const efficiency = this.calculateStudyEfficiency(score, timeSpent);
    
    if (score >= 80 && timeRatio <= 1.2) return 'easy';
    if (score <= 50 || timeRatio >= 2) return 'hard';
    return 'medium';
  }

  // Calculate consistency score
  static calculateConsistency(scores: number[]): number {
    if (scores.length < 2) return 100;
    const stdDev = this.calculateStandardDeviation(scores);
    const mean = this.calculateAverage(scores);
    const coefficientOfVariation = (stdDev / mean) * 100;
    return Math.max(0, 100 - coefficientOfVariation);
  }

  // Generate insights from performance data
  static generateInsights(userPerformance: UserPerformance, subjectPerformance: SubjectPerformance[]): string[] {
    const insights: string[] = [];

    // Overall performance insights
    if (userPerformance.averageScore >= 80) {
      insights.push('Mükemmel performans gösteriyorsun!');
    } else if (userPerformance.averageScore >= 60) {
      insights.push('İyi gidiyorsun, biraz daha çalışarak daha da iyileşebilirsin.');
    } else {
      insights.push('Daha fazla pratik yapman gerekiyor. Endişelenme, zamanla gelişeceksin!');
    }

    // Improvement insights
    if (userPerformance.improvementRate > 10) {
      insights.push(`Son zamanlarda %${userPerformance.improvementRate} iyileşme gösterdin!`);
    } else if (userPerformance.improvementRate < -10) {
      insights.push('Performansında düşüş var. Daha fazla çalışmaya odaklan.');
    }

    // Subject insights
    if (subjectPerformance.length > 0) {
      const bestSubject = subjectPerformance.reduce((best, current) => 
        current.averageScore > best.averageScore ? current : best
      );
      const worstSubject = subjectPerformance.reduce((worst, current) => 
        current.averageScore < worst.averageScore ? current : worst
      );

      if (bestSubject.averageScore >= 80) {
        insights.push(`${bestSubject.subject} konusunda çok başarılısın!`);
      }

      if (worstSubject.averageScore < 60) {
        insights.push(`${worstSubject.subject} konusunda daha fazla pratik yapman gerekiyor.`);
      }
    }

    // Activity insights
    if (userPerformance.totalQuizzes < 5) {
      insights.push('Daha fazla quiz çözerek performansını artırabilirsin.');
    } else if (userPerformance.totalQuizzes > 20) {
      insights.push('Çok aktif bir öğrencisin! Bu tempoyu koru.');
    }

    return insights;
  }

  // Calculate learning velocity (improvement over time)
  static calculateLearningVelocity(weeklyProgress: WeeklyProgress[]): number {
    if (weeklyProgress.length < 2) return 0;
    
    const recentWeeks = weeklyProgress.slice(-4); // Last 4 weeks
    if (recentWeeks.length < 2) return 0;

    const firstWeek = recentWeeks[0];
    const lastWeek = recentWeeks[recentWeeks.length - 1];
    
    const scoreImprovement = this.calculatePercentageChange(
      firstWeek.averageScore,
      lastWeek.averageScore
    );

    return Math.round(scoreImprovement * 100) / 100;
  }

  // Get study recommendations based on performance
  static getStudyRecommendations(
    userPerformance: UserPerformance,
    subjectPerformance: SubjectPerformance[]
  ): string[] {
    const recommendations: string[] = [];

    // Overall recommendations
    if (userPerformance.averageScore < 70) {
      recommendations.push('Temel konuları tekrar gözden geçir.');
      recommendations.push('Daha fazla pratik yap.');
    }

    if (userPerformance.totalTimeSpent < 60) {
      recommendations.push('Daha uzun süre çalışmaya odaklan.');
    }

    // Subject-specific recommendations
    subjectPerformance.forEach(subject => {
      if (subject.averageScore < 60) {
        recommendations.push(`${subject.subject} konusunda ek kaynaklar kullan.`);
      }
      
      if (subject.difficultyBreakdown.hard > subject.difficultyBreakdown.easy) {
        recommendations.push(`${subject.subject} konusunda zor sorulara daha fazla zaman ayır.`);
      }
    });

    // Time management recommendations
    if (userPerformance.totalTimeSpent > 300) {
      recommendations.push('Çalışma süreni daha verimli kullanmayı dene.');
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  // Calculate engagement score
  static calculateEngagementScore(
    totalQuizzes: number,
    averageTimeSpent: number,
    consistency: number,
    improvementRate: number
  ): number {
    const quizScore = Math.min(100, (totalQuizzes / 20) * 100); // Max 20 quizzes
    const timeScore = Math.min(100, (averageTimeSpent / 10) * 100); // Max 10 minutes per quiz
    const consistencyScore = consistency;
    const improvementScore = Math.min(100, Math.max(0, improvementRate + 50)); // -50 to +50 range

    return Math.round((quizScore * 0.3 + timeScore * 0.2 + consistencyScore * 0.3 + improvementScore * 0.2));
  }

  // Format date for display
  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  // Format date range for analytics
  static formatDateRange(startDate: Date, endDate: Date): string {
    const start = this.formatDate(startDate);
    const end = this.formatDate(endDate);
    return `${start} - ${end}`;
  }

  // Get week label from date string
  static getWeekLabel(dateString: string): string {
    const date = new Date(dateString);
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    return new Intl.DateTimeFormat('tr-TR', {
      month: 'short',
      day: 'numeric'
    }).format(weekStart);
  }

  // Calculate percentile rank
  static calculatePercentileRank(value: number, allValues: number[]): number {
    if (allValues.length === 0) return 0;
    
    const sortedValues = [...allValues].sort((a, b) => a - b);
    const rank = sortedValues.findIndex(v => v >= value);
    
    if (rank === -1) return 100;
    return Math.round(((rank + 1) / sortedValues.length) * 100);
  }

  // Generate performance summary
  static generatePerformanceSummary(userPerformance: UserPerformance): {
    status: 'excellent' | 'good' | 'average' | 'needs_improvement';
    message: string;
    color: string;
  } {
    const { averageScore, totalQuizzes, improvementRate } = userPerformance;

    if (averageScore >= 85 && totalQuizzes >= 10) {
      return {
        status: 'excellent',
        message: 'Mükemmel performans! Sen bir örnek öğrencisin.',
        color: '#10B981'
      };
    } else if (averageScore >= 70 && improvementRate >= 0) {
      return {
        status: 'good',
        message: 'İyi gidiyorsun! Bu tempoyu koru.',
        color: '#3B82F6'
      };
    } else if (averageScore >= 60) {
      return {
        status: 'average',
        message: 'Orta seviyedesin. Biraz daha çalışarak iyileşebilirsin.',
        color: '#F59E0B'
      };
    } else {
      return {
        status: 'needs_improvement',
        message: 'Daha fazla çalışmaya ihtiyacın var. Endişelenme, zamanla gelişeceksin!',
        color: '#EF4444'
      };
    }
  }
}

// Export convenience functions
export const {
  calculatePercentageChange,
  getTrendDirection,
  formatTime,
  calculateAverage,
  calculateMedian,
  calculateStandardDeviation,
  getPerformanceGrade,
  calculateStudyEfficiency,
  getDifficultyLevel,
  calculateConsistency,
  generateInsights,
  calculateLearningVelocity,
  getStudyRecommendations,
  calculateEngagementScore,
  formatDate,
  formatDateRange,
  getWeekLabel,
  calculatePercentileRank,
  generatePerformanceSummary
} = AnalyticsUtils;
