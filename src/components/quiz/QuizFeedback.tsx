import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { MathRenderer } from '../math-renderer';

interface QuizFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}

export function QuizFeedback({ isCorrect, correctAnswer, explanation }: QuizFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border-2 ${
        isCorrect
          ? 'bg-green-500/20 border-green-500/50'
          : 'bg-red-500/20 border-red-500/50'
      }`}
    >
      <div className="flex items-center space-x-3 mb-4">
        {isCorrect ? (
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        ) : (
          <XCircle className="w-8 h-8 text-red-400" />
        )}
        <h3 className={`text-xl font-semibold ${
          isCorrect ? 'text-green-400' : 'text-red-400'
        }`}>
          {isCorrect ? 'Doğru!' : 'Yanlış!'}
        </h3>
      </div>
      
      {!isCorrect && (
        <div className="mb-4">
          <p className="text-white/80 mb-2">Doğru cevap:</p>
          <div className="bg-white/10 p-3 rounded-lg">
            <MathRenderer text={correctAnswer} />
          </div>
        </div>
      )}
      
      {explanation && (
        <div>
          <p className="text-white/80 mb-2">Açıklama:</p>
          <p className="text-white">{explanation}</p>
        </div>
      )}
    </motion.div>
  );
}
