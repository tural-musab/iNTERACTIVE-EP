-- i-EP MVP Gamification Veritabanı Şeması
-- Bu script'i Supabase SQL Editor'da çalıştırın

-- 0. Content tablosu (ana içerik tablosu)
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  topic TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('lesson', 'quiz')),
  content_data JSONB NOT NULL DEFAULT '{}',
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content tablosu için index'ler
CREATE INDEX IF NOT EXISTS idx_content_creator_id ON content(creator_id);
CREATE INDEX IF NOT EXISTS idx_content_subject ON content(subject);
CREATE INDEX IF NOT EXISTS idx_content_grade ON content(grade);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(content_type);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at);

-- Content tablosu için RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Content tablosu için temel policy'ler (user_profiles tablosu oluşturulduktan sonra güncellenecek)
CREATE POLICY "Content is viewable by everyone" ON content
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert content" ON content
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Content creators can update their content" ON content
  FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Content creators can delete their content" ON content
  FOR DELETE USING (auth.uid() = creator_id);

-- 1. Kullanıcı rozetleri tablosu
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  badge_icon TEXT,
  badge_category TEXT CHECK (badge_category IN ('achievement', 'streak', 'quiz', 'social')),
  badge_rarity TEXT CHECK (badge_rarity IN ('common', 'rare', 'epic', 'legendary')),
  points_reward INTEGER DEFAULT 0,
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- 2. Puan geçmişi tablosu
CREATE TABLE IF NOT EXISTS point_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('quiz_completion', 'streak_bonus', 'achievement', 'daily_login', 'speed_bonus', 'perfect_score')),
  quiz_id UUID REFERENCES content(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Streak takibi tablosu
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  streak_type TEXT DEFAULT 'daily' CHECK (streak_type IN ('daily', 'weekly', 'quiz')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Kullanıcı istatistikleri tablosu
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_quizzes_completed INTEGER DEFAULT 0,
  total_correct_answers INTEGER DEFAULT 0,
  total_incorrect_answers INTEGER DEFAULT 0,
  average_accuracy DECIMAL(5,2) DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- saniye cinsinden
  total_points_earned INTEGER DEFAULT 0,
  favorite_subject TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Günlük liderlik tablosu (cache için)
CREATE TABLE IF NOT EXISTS daily_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  daily_points INTEGER DEFAULT 0,
  rank INTEGER,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 6. Analitik events tablosu
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Users tablosunu güncelle (varsa) - Bu kısım admin yetkisi gerektirdiği için kaldırıldı
-- Users tablosuna total_xp, level, avatar kolonları manuel olarak eklenmelidir
-- ALTER TABLE auth.users ADD COLUMN total_xp INTEGER DEFAULT 0;
-- ALTER TABLE auth.users ADD COLUMN level INTEGER DEFAULT 1;
-- ALTER TABLE auth.users ADD COLUMN avatar TEXT;

-- 8. Index'ler performans için
CREATE INDEX IF NOT EXISTS idx_point_history_user_id ON point_history(user_id);
CREATE INDEX IF NOT EXISTS idx_point_history_created_at ON point_history(created_at);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_leaderboard_date ON daily_leaderboard(date);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- 9. RLS (Row Level Security) Policies
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- User badges policies
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert badges" ON user_badges
  FOR INSERT WITH CHECK (true);

-- Point history policies
CREATE POLICY "Users can view own point history" ON point_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert points" ON point_history
  FOR INSERT WITH CHECK (true);

-- User streaks policies
CREATE POLICY "Users can view own streaks" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage streaks" ON user_streaks
  FOR ALL USING (true);

-- User stats policies
CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage stats" ON user_stats
  FOR ALL USING (true);

-- Daily leaderboard policies (herkes görebilir)
CREATE POLICY "Everyone can view leaderboard" ON daily_leaderboard
  FOR SELECT USING (true);

CREATE POLICY "System can manage leaderboard" ON daily_leaderboard
  FOR ALL USING (true);

-- Analytics events policies
CREATE POLICY "System can insert analytics" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own analytics" ON analytics_events
  FOR SELECT USING (auth.uid() = user_id);

-- 10. Functions ve Triggers

-- Kullanıcı stats'ını otomatik oluştur
CREATE OR REPLACE FUNCTION create_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO user_streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users tablosuna trigger ekle (eğer yoksa) - Bu kısım admin yetkisi gerektirdiği için kaldırıldı
-- Trigger'lar manuel olarak eklenmelidir
-- DROP TRIGGER IF EXISTS create_user_stats_trigger ON auth.users;
-- CREATE TRIGGER create_user_stats_trigger
-- AFTER INSERT ON auth.users
-- FOR EACH ROW
-- EXECUTE FUNCTION create_user_stats();

-- XP'den level hesaplama fonksiyonu
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
  level INTEGER := 1;
  required_xp INTEGER := 0;
BEGIN
  WHILE xp >= required_xp LOOP
    level := level + 1;
    required_xp := required_xp + (level * 100);
  END LOOP;
  RETURN level - 1;
END;
$$ LANGUAGE plpgsql;

-- Puan eklendiğinde XP ve level güncelle
CREATE OR REPLACE FUNCTION update_user_xp_and_level()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users 
  SET 
    total_xp = total_xp + NEW.points,
    level = calculate_level(total_xp + NEW.points)
  WHERE id = NEW.user_id;
  
  -- Stats tablosunu da güncelle
  UPDATE user_stats
  SET 
    total_points_earned = total_points_earned + NEW.points,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_xp_trigger ON point_history;
CREATE TRIGGER update_xp_trigger
AFTER INSERT ON point_history
FOR EACH ROW
EXECUTE FUNCTION update_user_xp_and_level();

-- 11. Varsayılan badge tanımları ekle
INSERT INTO user_badges (user_id, badge_id, badge_name, badge_description, badge_icon, badge_category, badge_rarity, points_reward)
VALUES 
  -- Sistem rozetleri (user_id NULL olacak, sadece tanım)
  (NULL, 'first_quiz', 'İlk Adım', 'İlk quizini tamamladın!', '🎯', 'achievement', 'common', 50),
  (NULL, 'streak_7', 'Haftalık Tutarlı', '7 gün üst üste aktif oldun!', '🔥', 'streak', 'rare', 100),
  (NULL, 'perfect_score', 'Mükemmeliyetçi', 'Bir quizde %100 başarı elde ettin!', '⭐', 'quiz', 'epic', 200),
  (NULL, 'speed_demon', 'Hız Şeytanı', 'Bir quizi 1 dakika içinde tamamladın!', '⚡', 'quiz', 'rare', 150),
  (NULL, 'quiz_master_10', 'Quiz Ustası', '10 quiz tamamladın!', '🏆', 'achievement', 'rare', 100)
ON CONFLICT DO NOTHING;

-- 12. Test verisi (isteğe bağlı)
-- INSERT INTO point_history (user_id, points, reason, metadata)
-- SELECT id, 100, 'quiz_completion', '{"quiz_id": "test-quiz-1"}'::jsonb
-- FROM users
-- LIMIT 1;

GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated; 