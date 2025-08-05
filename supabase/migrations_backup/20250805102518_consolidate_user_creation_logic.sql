-- Adım 1: Gereksiz ve eski trigger fonksiyonlarını veritabanından tamamen kaldır.
-- `CASCADE` ifadesi, bu fonksiyonlara bağlı olan eski trigger'ları da otomatik olarak siler.
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.create_user_stats() CASCADE;

-- Adım 2: Tüm mantığı birleştiren tek ve nihai fonksiyonu oluştur veya güncelle.
-- Bu fonksiyon, hem profil (user_profiles) hem de istatistik (user_stats, user_streaks) tablolarına
-- yeni kullanıcı için başlangıç kayıtlarını ekler.
CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
  user_full_name TEXT;
  user_grade INTEGER;
BEGIN
  -- Yeni kullanıcının metadata'sından rol, isim ve sınıf bilgilerini al.
  -- Eğer bu bilgiler yoksa, rol için varsayılan olarak 'student' ata.
  IF NEW.raw_user_meta_data IS NOT NULL THEN
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
    user_full_name := NEW.raw_user_meta_data->>'full_name';
    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;
  ELSE
    user_role := 'student';
  END IF;

  -- `user_profiles` tablosuna yeni kullanıcı bilgilerini ekle.
  -- Eğer aynı user_id ile bir kayıt zaten varsa, çakışmayı önle ve güncelle.
  INSERT INTO public.user_profiles (user_id, role, full_name, email, grade)
  VALUES (NEW.id, user_role::public.user_role, user_full_name, NEW.email, user_grade)
  ON CONFLICT (user_id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    grade = EXCLUDED.grade,
    updated_at = NOW();

  -- `user_stats` tablosuna başlangıç kaydını ekle.
  -- Çakışma durumunda hiçbir şey yapma.
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- `user_streaks` tablosuna başlangıç kaydını ekle.
  -- Çakışma durumunda hiçbir şey yapma.
  INSERT INTO public.user_streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Adım 3: auth.users tablosu için trigger'ı oluştur.
-- Önce eski trigger varsa diye temizle, sonra yenisini oluştur.
-- Bu, her yeni kullanıcı eklendiğinde YALNIZCA bizim birleşik fonksiyonumuzun çalışmasını garanti eder.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();