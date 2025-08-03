interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  size?: 'small' | 'medium' | 'large';
}

export function StreakDisplay({ currentStreak, longestStreak, size = 'medium' }: StreakDisplayProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex items-center space-x-2 bg-orange-500/20 rounded-full px-4 py-2">
      <span className="text-2xl">🔥</span>
      <div className={sizeClasses[size]}>
        <div className="font-bold text-orange-400">{currentStreak} gün</div>
        <div className="text-orange-300 text-xs">En uzun: {longestStreak}</div>
      </div>
    </div>
  );
}
