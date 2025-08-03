// src/types/quiz.ts

export enum QuizMode {
    PRACTICE = 'practice',
    TEST = 'test',
    REVIEW = 'review'
  }
  
  export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching';
  export type DifficultyLevel = 'easy' | 'medium' | 'hard';
  
  export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    options?: string[];
    correct: number | boolean | string;
    points: number;
    explanation?: string;
    difficulty?: DifficultyLevel;
    timeLimit?: number; // seconds
    hint?: string;
    category?: string;
    tags?: string[];
  }
  
  export interface Quiz {
    id: string;
    title: string;
    description?: string;
    subject: string;
    grade: number;
    topic: string;
    questions: Question[];
    timeLimit?: number; // minutes
    passingScore: number;
    totalPoints: number;
    difficulty?: DifficultyLevel;
    instructions?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface QuizAttempt {
    id: string;
    quizId: string;
    studentId: string;
    mode: QuizMode;
    startedAt: Date;
    completedAt?: Date;
    timeSpent: number; // seconds
    score: number;
    totalPoints: number;
    correctAnswers: number;
    incorrectAnswers: number;
    skippedQuestions: number;
    answers: UserAnswer[];
    pointsEarned: number;
    streakBonus: number;
    speedBonus: number;
    accuracy: number; // percentage
    passed: boolean;
  }
  
  export interface UserAnswer {
    questionId: number;
    answer: number | boolean | string | null;
    isCorrect: boolean;
    timeSpent: number; // seconds
    pointsEarned: number;
    usedHint: boolean;
  }
  
  export interface QuizResults {
    attempt: QuizAttempt;
    badges?: BadgeEarned[];
    newLevel?: number;
    xpEarned?: number;
    rank?: number;
    percentile?: number;
    recommendations?: string[];
  }
  
  export interface BadgeEarned {
    badgeId: string;
    badgeName: string;
    badgeIcon: string;
    pointsRewarded: number;
  }