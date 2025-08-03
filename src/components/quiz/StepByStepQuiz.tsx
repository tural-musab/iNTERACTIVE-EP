'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { MathRenderer } from '../math-renderer';
import { ProgressBar } from './QuizProgressBar';
import { AnswerOption } from './AnswerOption';
import { QuizFeedback } from './QuizFeedback';
import { useQuizAnimations } from '../../hooks/useAnimations';
import { useGamificationStore } from '../../stores/gamificationStore';
import { PointsAnimation, usePointsAnimation } from '../gamification/PointsAnimation';
import Confetti from 'react-confetti';

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  answers: number[];
  timeSpent: number;
}

export enum QuizMode {
  PRACTICE = 'practice',
  TEST = 'test',
  REVIEW = 'review'
}

interface StepByStepQuizProps {
  quiz: Quiz;
  mode: QuizMode;
  onComplete: (results: QuizResults) => void;
}

export function StepByStepQuiz({ quiz, mode, onComplete }: StepByStepQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime] = useState(Date.now());
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Animasyon hook'larını kullan
  const { questionEnter, questionExit, feedback, confetti } = useQuizAnimations();
  
  // Gamification store'u kullan
  const { addPoints, currentStreak, updateStreak } = useGamificationStore();
  
  // Puan animasyonu hook'u
  const { addPointsAnimation } = usePointsAnimation();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === currentQuestion.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update user answers
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    // Gamification: Puan ekleme ve streak güncelleme
    if (correct) {
      const timeSpent = Date.now() - startTime;
      const points = calculatePoints(correct, timeSpent, currentStreak);
      
      // Puanları ekle
      addPoints(points, 'quiz_completion', {
        quizId: quiz.id,
        questionId: currentQuestion.id,
        mode: mode
      });
      
      // Streak güncelle
      updateStreak('quiz');
      
      // Puan animasyonu göster
      setPointsEarned(points);
      setShowPointsAnimation(true);
      
      // Puan animasyonu pozisyonu (ekranın ortası)
      addPointsAnimation(points, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }, 'quiz_completion');
      
      // Konfeti göster
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // 3 saniye sonra sonraki soruya geç
    setTimeout(() => {
      setShowFeedback(false);
      setShowPointsAnimation(false);
      
      if (currentQuestionIndex + 1 < quiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz tamamlandığında konfeti göster
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        
        onComplete({
          score: newAnswers.filter((answer, index) => 
            answer === quiz.questions[index].correct
          ).length,
          totalQuestions: quiz.questions.length,
          answers: newAnswers,
          timeSpent: Date.now() - startTime
        });
      }
    }, 3000);
  };

  // Puan hesaplama fonksiyonu
  const calculatePoints = (isCorrect: boolean, timeSpent: number, streak: number): number => {
    if (!isCorrect) return 0;
    
    let points = 10; // Base points
    points += streak * 2; // Streak bonus
    if (timeSpent < 30000) points += 5; // Hızlı cevap bonusu (30 saniye altı)
    
    return points;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Konfeti efekti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
        />
      )}

      {/* Gamification: Puan animasyonu */}
      {showPointsAnimation && (
        <PointsAnimation
          points={pointsEarned}
          reason="quiz_completion"
          position={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
          onComplete={() => setShowPointsAnimation(false)}
          showConfetti={false}
        />
      )}

      {/* Progress Bar */}
      <ProgressBar progress={progress} />
      
      {/* Question Display with Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          variants={questionEnter}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 my-6"
        >
          <div className="mb-6">
            <span className="text-white/60 text-sm">
              Soru {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
          </div>
          
          <div className="mb-8">
            <MathRenderer text={currentQuestion.question} />
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <AnswerOption
                key={index}
                option={option}
                index={index}
                isCorrect={currentQuestion.correct === index}
                showFeedback={showFeedback}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback with Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            variants={feedback}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <QuizFeedback
              isCorrect={isCorrect}
              correctAnswer={currentQuestion.options[currentQuestion.correct]}
              explanation={currentQuestion.explanation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
