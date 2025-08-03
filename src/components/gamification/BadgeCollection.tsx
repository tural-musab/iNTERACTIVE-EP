import React from 'react';
import { motion } from 'framer-motion';
import { Badge, BADGES, RARITY_COLORS, RARITY_NAMES, getEarnedBadges, getUnearnedBadges } from '../../constants/badges';

interface BadgeCollectionProps {
  earnedBadgeIds?: string[];
  showUnearned?: boolean;
  maxDisplay?: number;
}

export function BadgeCollection({ 
  earnedBadgeIds = [], 
  showUnearned = false, 
  maxDisplay = 8 
}: BadgeCollectionProps) {
  const earnedBadges = getEarnedBadges(earnedBadgeIds);
  const unearnedBadges = showUnearned ? getUnearnedBadges(earnedBadgeIds) : [];
  
  const displayBadges = [...earnedBadges, ...unearnedBadges].slice(0, maxDisplay);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Rozet Koleksiyonu</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBadges.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          const rarityColor = RARITY_COLORS[badge.rarity];
          
          return (
            <motion.div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isEarned
                  ? 'bg-white/10 border-white/20 hover:bg-white/15'
                  : 'bg-gray-800/50 border-gray-700 opacity-50 hover:opacity-70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: isEarned ? rarityColor : undefined
              }}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h3 className="font-semibold text-white mb-1 text-sm">{badge.name}</h3>
              <p className="text-xs text-gray-300 mb-2">{badge.description}</p>
              
              {/* Rarity badge */}
              <div 
                className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2"
                style={{ 
                  backgroundColor: `${rarityColor}20`,
                  color: rarityColor,
                  border: `1px solid ${rarityColor}40`
                }}
              >
                {RARITY_NAMES[badge.rarity]}
              </div>
              
              {isEarned && (
                <div className="text-xs text-green-400 font-medium">
                  +{badge.pointsReward} XP
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {earnedBadges.length === 0 && !showUnearned && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">🏆</div>
          <p>Henüz rozet kazanmadın!</p>
          <p className="text-sm">Quiz çözmeye devam et ve rozetlerini topla.</p>
        </div>
      )}
      
      {showUnearned && unearnedBadges.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            {earnedBadges.length} / {BADGES.length} rozet kazandın
          </p>
        </div>
      )}
    </div>
  );
}
