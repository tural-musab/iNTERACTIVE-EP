import { useMemo, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useAnimation, Variants } from 'framer-motion';

// Animation configuration interface
interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

// Quiz-specific animation variants
interface QuizAnimations {
  questionEnter: Variants;
  questionExit: Variants;
  answerOption: Variants;
  feedback: Variants;
  progressBar: Variants;
  confetti: Variants;
}

// Gamification-specific animation variants
interface GamificationAnimations {
  pointsIncrease: Variants;
  badgeUnlock: Variants;
  levelUp: Variants;
  streak: Variants;
  leaderboard: Variants;
}

// Loading animation variants
interface LoadingAnimations {
  spinner: Variants;
  skeleton: Variants;
  pulse: Variants;
  shimmer: Variants;
}

// Transition animation variants
interface TransitionAnimations {
  pageEnter: Variants;
  pageExit: Variants;
  modalEnter: Variants;
  modalExit: Variants;
  slideIn: Variants;
  slideOut: Variants;
  fadeIn: Variants;
  fadeOut: Variants;
}

// Main animation hook
export function useAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, []);

  // Base animation config
  const baseConfig: AnimationConfig = useMemo(() => ({
    duration: prefersReducedMotion ? 0.1 : 0.3,
    ease: 'easeInOut'
  }), [prefersReducedMotion]);

  // Quiz Animations
  const quizAnimations: QuizAnimations = useMemo(() => ({
    // Soru giriş animasyonu
    questionEnter: {
      initial: { 
        opacity: 0, 
        y: 20, 
        scale: 0.95 
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      },
      exit: { 
        opacity: 0, 
        y: -20, 
        scale: 0.95 
      },
      transition: {
        duration: baseConfig.duration,
        ease: baseConfig.ease
      }
    },

    // Soru çıkış animasyonu
    questionExit: {
      initial: { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      },
      animate: { 
        opacity: 0, 
        y: -20, 
        scale: 0.95 
      },
      transition: {
        duration: baseConfig.duration,
        ease: baseConfig.ease
      }
    },

    // Cevap seçeneği animasyonu
    answerOption: {
      initial: { 
        scale: 1, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)' 
      },
      hover: { 
        scale: 1.02, 
        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
      },
      tap: { 
        scale: 0.98 
      },
      correct: {
        scale: [1, 1.05, 1],
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        transition: {
          duration: 0.6,
          ease: 'easeInOut'
        }
      },
      incorrect: {
        scale: [1, 0.95, 1],
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        transition: {
          duration: 0.6,
          ease: 'easeInOut'
        }
      }
    },

    // Feedback animasyonu
    feedback: {
      initial: { 
        opacity: 0, 
        scale: 0.8, 
        y: 20 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0 
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: -20 
      },
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },

    // Progress bar animasyonu
    progressBar: {
      initial: { 
        width: 0 
      },
      animate: (progress: number) => ({ 
        width: `${progress}%` 
      }),
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    },

    // Konfeti animasyonu
    confetti: {
      initial: { 
        opacity: 0, 
        scale: 0, 
        y: 0 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: -100 
      },
      exit: { 
        opacity: 0, 
        scale: 0 
      },
      transition: {
        duration: 2,
        ease: 'easeOut'
      }
    }
  }), [baseConfig]);

  // Gamification Animations
  const gamificationAnimations: GamificationAnimations = useMemo(() => ({
    // Puan artış animasyonu
    pointsIncrease: {
      initial: { 
        opacity: 0, 
        scale: 0.5, 
        y: 0 
      },
      animate: { 
        opacity: 1, 
        scale: 1.2, 
        y: -50 
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: -100 
      },
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    },

    // Rozet açma animasyonu
    badgeUnlock: {
      initial: { 
        opacity: 0, 
        scale: 0, 
        rotate: -180 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0 
      },
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200
      }
    },

    // Seviye atlama animasyonu
    levelUp: {
      initial: { 
        opacity: 0, 
        scale: 0.8, 
        y: 20 
      },
      animate: { 
        opacity: 1, 
        scale: 1.1, 
        y: 0 
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: -20 
      },
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    },

    // Streak animasyonu
    streak: {
      initial: { 
        opacity: 0, 
        scale: 0.8 
      },
      animate: { 
        opacity: 1, 
        scale: 1 
      },
      hover: { 
        scale: 1.05 
      },
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },

    // Liderlik tablosu animasyonu
    leaderboard: {
      initial: { 
        opacity: 0, 
        x: -20 
      },
      animate: { 
        opacity: 1, 
        x: 0 
      },
      exit: { 
        opacity: 0, 
        x: 20 
      },
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }), [baseConfig]);

  // Loading Animations
  const loadingAnimations: LoadingAnimations = useMemo(() => ({
    // Spinner animasyonu
    spinner: {
      animate: { 
        rotate: 360 
      },
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    },

    // Skeleton animasyonu
    skeleton: {
      initial: { 
        opacity: 0.3 
      },
      animate: { 
        opacity: 0.7 
      },
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    },

    // Pulse animasyonu
    pulse: {
      initial: { 
        scale: 1 
      },
      animate: { 
        scale: [1, 1.05, 1] 
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },

    // Shimmer animasyonu
    shimmer: {
      initial: { 
        x: '-100%' 
      },
      animate: { 
        x: '100%' 
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }), []);

  // Transition Animations
  const transitionAnimations: TransitionAnimations = useMemo(() => ({
    // Sayfa giriş animasyonu
    pageEnter: {
      initial: { 
        opacity: 0, 
        y: 20 
      },
      animate: { 
        opacity: 1, 
        y: 0 
      },
      exit: { 
        opacity: 0, 
        y: -20 
      },
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },

    // Sayfa çıkış animasyonu
    pageExit: {
      initial: { 
        opacity: 1, 
        y: 0 
      },
      animate: { 
        opacity: 0, 
        y: -20 
      },
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },

    // Modal giriş animasyonu
    modalEnter: {
      initial: { 
        opacity: 0, 
        scale: 0.8, 
        y: 20 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0 
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: 20 
      },
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },

    // Modal çıkış animasyonu
    modalExit: {
      initial: { 
        opacity: 1, 
        scale: 1, 
        y: 0 
      },
      animate: { 
        opacity: 0, 
        scale: 0.8, 
        y: 20 
      },
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },

    // Slide in animasyonu
    slideIn: {
      initial: { 
        x: -100, 
        opacity: 0 
      },
      animate: { 
        x: 0, 
        opacity: 1 
      },
      exit: { 
        x: 100, 
        opacity: 0 
      },
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },

    // Slide out animasyonu
    slideOut: {
      initial: { 
        x: 0, 
        opacity: 1 
      },
      animate: { 
        x: 100, 
        opacity: 0 
      },
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },

    // Fade in animasyonu
    fadeIn: {
      initial: { 
        opacity: 0 
      },
      animate: { 
        opacity: 1 
      },
      exit: { 
        opacity: 0 
      },
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },

    // Fade out animasyonu
    fadeOut: {
      initial: { 
        opacity: 1 
      },
      animate: { 
        opacity: 0 
      },
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  }), [baseConfig]);

  // Utility functions
  const createStaggerAnimation = useCallback((delay: number = 0.1) => ({
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: delay
    }
  }), []);

  const createStaggerItem = useCallback(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }), []);

  // Spring animations
  const useSpringAnimation = useCallback((value: number, config?: any) => {
    return useSpring(value, {
      stiffness: 100,
      damping: 20,
      ...config
    });
  }, []);

  // Transform animations
  const useTransformAnimation = useCallback((input: any, output: any) => {
    return useTransform(input, output);
  }, []);

  // Motion value animations
  const useMotionValueAnimation = useCallback((initialValue: number) => {
    return useMotionValue(initialValue);
  }, []);

  // Animation controls
  const useAnimationControls = useCallback(() => {
    return useAnimation();
  }, []);

  return {
    // Animation variants
    quiz: quizAnimations,
    gamification: gamificationAnimations,
    loading: loadingAnimations,
    transition: transitionAnimations,
    
    // Utility functions
    createStaggerAnimation,
    createStaggerItem,
    useSpringAnimation,
    useTransformAnimation,
    useMotionValueAnimation,
    useAnimationControls,
    
    // Configuration
    baseConfig,
    prefersReducedMotion
  };
}

// Specialized hooks for specific use cases
export function useQuizAnimations() {
  const { quiz } = useAnimations();
  return quiz;
}

export function useGamificationAnimations() {
  const { gamification } = useAnimations();
  return gamification;
}

export function useLoadingAnimations() {
  const { loading } = useAnimations();
  return loading;
}

export function useTransitionAnimations() {
  const { transition } = useAnimations();
  return transition;
}

// Animation components
export const AnimatedContainer = motion.div;
export const AnimatedButton = motion.button;
export const AnimatedText = motion.span;
export const AnimatedImage = motion.img;
