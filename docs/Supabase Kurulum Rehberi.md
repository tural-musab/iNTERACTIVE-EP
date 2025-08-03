# Supabase Kurulum Rehberi - i-EP

## 1. Supabase Projesi Oluşturma

1. [supabase.com](https://supabase.com) → "Start your project"
2. GitHub ile giriş yap
3. "New Project" → Proje adı: `i-ep-mvp`
4. Database Password: Güçlü bir şifre (kaydet!)
5. Region: `Frankfurt (eu-central-1)`
6. Free tier seç

## 2. Database Setup

### SQL Editor'e Git ve Çalıştır

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  grade INTEGER CHECK (grade >= 5 AND grade <= 11),
  student_number VARCHAR(50) UNIQUE NOT NULL DEFAULT 'STD' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0'),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Parents table
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Parent-Student relationship
CREATE TABLE parent_student_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  invite_token VARCHAR(255) UNIQUE,
  invited_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP,
  UNIQUE(parent_id, student_id)
);

-- Content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(50) DEFAULT 'math',
  grade INTEGER,
  topic VARCHAR(255),
  content_type VARCHAR(20) CHECK (content_type IN ('lesson', 'quiz')),
  content_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES content(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  answers JSONB,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Teacher applications
CREATE TABLE teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subjects TEXT[],
  experience TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  applied_at TIMESTAMP DEFAULT NOW()
);
```

## 3. Row Level Security (RLS) Setup

```sql
-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

-- Students policies
CREATE POLICY "Students can view own data" ON students
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update own data" ON students
  FOR UPDATE USING (auth.uid() = user_id);

-- Parents policies
CREATE POLICY "Parents can view linked children" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_student_links psl
      JOIN parents p ON p.id = psl.parent_id
      WHERE psl.student_id = students.id
      AND p.user_id = auth.uid()
      AND psl.status = 'confirmed'
    )
  );

-- Content policies
CREATE POLICY "Content is viewable by all authenticated users" ON content
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Quiz attempts policies
CREATE POLICY "Students can insert own quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = quiz_attempts.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can view own quiz attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = quiz_attempts.student_id
      AND students.user_id = auth.uid()
    )
  );

-- Parent can view child's quiz attempts
CREATE POLICY "Parents can view children quiz attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_student_links psl
      JOIN parents p ON p.id = psl.parent_id
      WHERE psl.student_id = quiz_attempts.student_id
      AND p.user_id = auth.uid()
      AND psl.status = 'confirmed'
    )
  );
```

## 4. Auth Setup

1. Authentication → Settings
2. Site URL: `http://localhost:3000` (development)
3. Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://i-ep.app/auth/callback` (production için ekle)

## 5. Email Templates

Authentication → Email Templates → Invite User

```html
<h2>i-EP'e Davet Edildiniz</h2>
<p>Merhaba,</p>
<p>{{ .SiteURL }}/auth/parent-signup?token={{ .Token }} adresine tıklayarak kayıt olabilirsiniz.</p>
<p>Bu link 24 saat geçerlidir.</p>
```

## 6. Seed Data (İlk İçerikler)

```sql
-- Sample math content
INSERT INTO content (title, subject, grade, topic, content_type, content_data) VALUES
('Kesirler - Giriş', 'math', 5, 'Kesirler', 'lesson', 
  '{"description": "Kesirlerin temel tanımı ve gösterimi", "content": "Kesir, bir bütünün parçalarını ifade eder..."}'),
  
('Kesirler Quiz 1', 'math', 5, 'Kesirler', 'quiz',
  '{"questions": [
    {"id": 1, "question": "1/2 + 1/2 = ?", "options": ["1", "2", "1/4", "1/2"], "correct": 0},
    {"id": 2, "question": "3/4 hangi kesre eşittir?", "options": ["6/8", "4/3", "1/4", "2/4"], "correct": 0}
  ]}'),

('Denklemler - Giriş', 'math', 6, 'Denklemler', 'lesson',
  '{"description": "Birinci dereceden denklemler", "content": "Denklem, eşitlik içeren matematiksel ifadedir..."}'),

('Denklemler Quiz 1', 'math', 6, 'Denklemler', 'quiz',
  '{"questions": [
    {"id": 1, "question": "x + 5 = 10 ise x = ?", "options": ["5", "10", "15", "0"], "correct": 0},
    {"id": 2, "question": "2x = 8 ise x = ?", "options": ["2", "4", "6", "8"], "correct": 1}
  ]}');

-- Admin user (manual)
-- Email: admin@i-ep.app
-- Password: (sen belirle)
-- Role: Manuel olarak veritabanından 'admin' yap
```

## 7. Environment Variables

`.env.local` dosyası:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

RESEND_API_KEY=your-resend-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 8. Test Kullanıcıları

1. **Öğrenci:**
   - Email: <ogrenci1@test.com>
   - Şifre: Test1234!
   - Sınıf: 5

2. **Veli:**
   - Öğrenci tarafından davet edilecek

3. **Admin:**
   - Email: <admin@i-ep.app>
   - Şifre: Admin1234!

## Önemli Notlar

- [ ] Anon key'i frontend'de kullan
- [ ] Service key'i sadece server-side kullan
- [ ] Production'da URL'leri güncelle
- [ ] RLS policies'i test et
- [ ] Email gönderimi için Resend entegrasyonu yap
