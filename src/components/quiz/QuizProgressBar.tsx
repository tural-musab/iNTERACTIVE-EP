import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  animated?: boolean;
}

export function ProgressBar({ progress, animated = true }: ProgressBarProps) {
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-3 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: animated ? 1 : 0.3, 
          ease: "easeOut" 
        }}
      />
    </div>
  );
}
