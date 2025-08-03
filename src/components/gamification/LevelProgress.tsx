interface LevelData {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

interface LevelProgressProps {
  levelData: LevelData;
  showDetails?: boolean;
}

export function LevelProgress({ levelData, showDetails = true }: LevelProgressProps) {
  const progressPercentage = ((levelData.currentXP / levelData.xpToNextLevel) * 100);

  return (
    <div className="bg-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">Seviye {levelData.level}</span>
        <span className="text-gray-300 text-sm">
          {levelData.currentXP} / {levelData.xpToNextLevel} XP
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3 mb-2">
        <div
          className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {showDetails && (
        <div className="text-xs text-gray-300">
          Toplam XP: {levelData.totalXP}
        </div>
      )}
    </div>
  );
}
