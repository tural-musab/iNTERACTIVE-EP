'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, RotateCcw, Sparkles } from 'lucide-react';

export enum QuizMode {
  PRACTICE = 'practice',
  TEST = 'test',
  REVIEW = 'review'
}

interface QuizModeSelectorProps {
  onModeSelect: (mode: QuizMode) => void;
  selectedMode?: QuizMode;
}

const modeConfig = [
  {
    id: QuizMode.PRACTICE,
    title: 'Pratik Modu',
    description: 'Tek soru odaklı, anında geri bildirim',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50'
  },
  {
    id: QuizMode.TEST,
    title: 'Test Modu',
    description: 'Tüm soruları göster, zaman sınırlı',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/50'
  },
  {
    id: QuizMode.REVIEW,
    title: 'Gözden Geçirme',
    description: 'Yanlış cevapları tekrar çöz',
    icon: RotateCcw,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50'
  }
];

export function QuizModeSelector({ onModeSelect, selectedMode }: QuizModeSelectorProps) {
  const [hoveredMode, setHoveredMode] = useState<QuizMode | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Quiz Modunu Seç</h2>
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>
        <p className="text-gray-300">Öğrenme tarzına en uygun modu seç ve başla!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modeConfig.map((mode, index) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          const isHovered = hoveredMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onModeSelect(mode.id)}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              className={`
                relative overflow-hidden rounded-3xl p-6
                transition-all duration-300 transform
                ${isSelected 
                  ? `${mode.bgColor} ${mode.borderColor} border-2` 
                  : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                }
              `}
            >
              {/* Background Gradient Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0`}
                animate={{ opacity: isHovered || isSelected ? 0.2 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className={`
                  w-16 h-16 rounded-2xl mb-4 mx-auto
                  flex items-center justify-center
                  bg-gradient-to-br ${mode.color}
                  ${isSelected ? 'shadow-lg' : ''}
                `}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {mode.title}
                </h3>

                <p className="text-gray-300 text-sm">
                  {mode.description}
                </p>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Hover Effect Particles */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        opacity: 0
                      }}
                      animate={{
                        y: -20,
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => console.log('Start quiz with mode:', selectedMode)}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <span>Başla</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
} 