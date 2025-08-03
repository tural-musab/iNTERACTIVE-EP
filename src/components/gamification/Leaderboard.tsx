import { LeaderboardEntry } from '../../types/gamification';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  userRank?: number;
  category: string;
}

export function Leaderboard({ entries, userRank, category }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="bg-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">
        Liderlik Tablosu - {category}
      </h3>
      
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getRankIcon(entry.rank)}</span>
              <div className="flex items-center space-x-2">
                {entry.avatar && (
                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-white font-medium">{entry.username}</span>
              </div>
            </div>
            <span className="text-yellow-400 font-bold">{entry.score} XP</span>
          </div>
        ))}
      </div>

      {userRank && (
        <div className="mt-4 p-3 bg-blue-500/20 rounded-xl border border-blue-500/50">
          <div className="text-center text-blue-300">
            Senin sıralaman: #{userRank}
          </div>
        </div>
      )}
    </div>
  );
}
