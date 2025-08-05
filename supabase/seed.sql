-- Bu betik, veritabanını test için başlangıç verileriyle doldurur.
-- Supabase projesi sıfırlandığında otomatik olarak çalışır.

-- 1. Test için bir öğretmen kullanıcısı oluşturuyoruz.
-- NOT: Bu kullanıcı auth.users tablosuna eklendiğinde, bizim yazdığımız trigger
-- otomatik olarak user_profiles tablosunda da bir satır oluşturacaktır.
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES ('00000000-0000-0000-0000-000000000001', 'teacher@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"full_name": "Ayşe Öğretmen"}')
ON CONFLICT (id) DO NOTHING;

-- Oluşturduğumuz bu kullanıcının rolünü 'teacher' olarak güncelliyoruz.
-- Trigger varsayılan olarak 'student' atadığı için bu güncelleme gereklidir.
UPDATE public.user_profiles
SET role = 'teacher'
WHERE user_id = '00000000-0000-0000-0000-000000000001';


-- 2. Ayşe Öğretmen adına örnek dersler ve quizler ekliyoruz.
-- Bu veriler artık yeni ve doğru olan `creator_id` sütununu içeriyor.
INSERT INTO public.content (title, subject, grade, topic, content_type, content_data, creator_id) VALUES
-- 5. Sınıf Kesirler Dersi
('Kesirler - Giriş', 'math', 5, 'Kesirler', 'lesson', 
  '{"description": "Kesirlerin temel tanımı ve gösterimi.", "sections": [{"title": "Kesir Nedir?", "content": "Kesir, bir bütünün eşit parçalarından bir veya birkaçını gösterir."}]}', 
  '00000000-0000-0000-0000-000000000001'),

-- 5. Sınıf Kesirler Quiz 1
('Kesirler Quiz 1', 'math', 5, 'Kesirler', 'quiz',
  '{"time_limit": 15, "questions": [{"question": "1/2 + 1/2 = ?", "options": ["1", "2", "1/4"], "correct": 0}]}', 
  '00000000-0000-0000-0000-000000000001'),

-- 6. Sınıf Denklemler Dersi
('Denklemler - Giriş', 'math', 6, 'Denklemler', 'lesson',
  '{"description": "Birinci dereceden denklemler.", "sections": [{"title": "Denklem Nedir?", "content": "Denklem, içinde bilinmeyen bulunan eşitliktir."}]}', 
  '00000000-0000-0000-0000-000000000001');