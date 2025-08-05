import type { Content, QuizAttempt as DatabaseQuizAttempt, ContentType } from './database'

// Quiz modes
export enum QuizMode {
  PRACTICE = 'practice',
  TEST = 'test',
  REVIEW = 'review'
}

// Question types - Database'de content_data içinde saklanacak
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface Question {
  id: number
  question: string
  type: QuestionType
  options?: string[]
  correct: number | boolean | string
  points: number
  explanation?: string
  difficulty?: DifficultyLevel
  timeLimit?: number // seconds
  hint?: string
  category?: string
  tags?: string[]
}

// Quiz Content Data Structure - Database content_data alanında saklanacak format
export interface QuizContentData {
  questions: Question[]
  timeLimit?: number // minutes
  passingScore: number
  totalPoints: number
  difficulty?: DifficultyLevel
  instructions?: string
}

// Lesson Content Data Structure - Database content_data alanında saklanacak format
export interface LessonContentData {
  content: string
  duration?: number // minutes
  attachments?: string[]
  resources?: Array<{
    title: string
    url: string
    type: 'video' | 'document' | 'link'
  }>
}

// Content Data Union Type
export type ContentData = QuizContentData | LessonContentData

// Database ile tam uyumlu Quiz interface
export interface Quiz extends Omit<Content, 'content_data'> {
  content_type: 'quiz'
  content_data: QuizContentData
}

// Database ile tam uyumlu Lesson interface  
export interface Lesson extends Omit<Content, 'content_data'> {
  content_type: 'lesson'
  content_data: LessonContentData
}
  
// Database ile tam uyumlu QuizAttempt interface
export interface QuizAttempt extends DatabaseQuizAttempt {
  // Database'deki tüm alanlar dahil
  // answers alanı jsonb olarak saklanıyor, UserAnswer[] formatında
}

export interface UserAnswer {
  questionId: number
  answer: number | boolean | string | null
  isCorrect: boolean
  timeSpent: number // seconds
  pointsEarned: number
  usedHint: boolean
}

export interface QuizResults {
  attempt: QuizAttempt
  badges?: BadgeEarned[]
  newLevel?: number
  xpEarned?: number
  rank?: number
  percentile?: number
  recommendations?: string[]
}

export interface BadgeEarned {
  badgeId: string
  badgeName: string
  badgeIcon: string
  pointsRewarded: number
}