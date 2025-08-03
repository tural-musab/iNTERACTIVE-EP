import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { MathRenderer } from '../math-renderer';
import { useQuizAnimations } from '../../hooks/useAnimations';

interface AnswerOptionProps {
  option: string;
  index: number;
  isCorrect: boolean;
  showFeedback: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function AnswerOption({
  option,
  index,
  isCorrect,
  showFeedback,
  onClick,
  disabled
}: AnswerOptionProps) {
  // Animasyon hook'larını kullan
  const { answerOption } = useQuizAnimations();

  const getOptionStyle = () => {
    if (!showFeedback) {
      return 'bg-white/20 text-white hover:bg-white/30';
    }
    
    if (isCorrect) {
      return 'bg-green-500 text-white';
    }
    
    return 'bg-red-500 text-white';
  };

  return (
    <motion.button
      variants={answerOption}
      initial="initial"
      animate={showFeedback ? (isCorrect ? "correct" : "incorrect") : "initial"}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-2xl font-semibold ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${getOptionStyle()}`}
    >
      <div className="flex items-center space-x-3">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
          {String.fromCharCode(65 + index)}
        </span>
        <MathRenderer text={option} />
        {showFeedback && isCorrect && (
          <CheckCircle2 className="w-6 h-6 text-white" />
        )}
      </div>
    </motion.button>
  );
}
