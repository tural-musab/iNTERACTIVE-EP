# Cursor AI Master Prompt - i-EP MVP Projesi

## Proje Bağlamı

Sen, 30 günde tamamlanması gereken bir eğitim platformu MVP'si geliştiriyorsun. Tek geliştiricisin ve sıfır sermayeyle çalışıyorsun. Her kod satırı minimal, çalışır ve gereksiz karmaşıklıktan uzak olmalı.

## Teknik Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth + Database + Realtime)
- **Email:** Resend
- **Deployment:** Vercel
- **Domain:** i-ep.app

## Proje Yapısı

```
i-ep/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── student/
│   │   │   ├── page.tsx
│   │   │   ├── lessons/page.tsx
│   │   │   ├── quizzes/page.tsx
│   │   │   └── progress/page.tsx
│   │   ├── parent/
│   │   │   ├── page.tsx
│   │   │   └── children/[id]/page.tsx
│   │   ├── teacher/
│   │   │   └── apply/page.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       └── applications/page.tsx
│   ├── api/
│   │   ├── auth/[...auth]/route.ts
│   │   ├── invite-parent/route.ts
│   │   └── quiz/submit/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   └── shared/
│       ├── navbar.tsx
│       └── loading.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   └── useUser.ts
└── types/
    └── index.ts
```

## Veritabanı Şeması (Supabase SQL)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles enum
CREATE TYPE user_role AS ENUM ('student', 'parent', 'teacher', 'admin');

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
  applied_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- RLS Policies
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

-- Students can view their own data
CREATE POLICY "Students can view own data" ON students
  FOR SELECT USING (auth.uid() = user_id);

-- Parents can view their children's data
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

-- Everyone can view content
CREATE POLICY "Content is viewable by all" ON content
  FOR SELECT USING (true);

-- Students can submit quiz attempts
CREATE POLICY "Students can submit quizzes" ON quiz_attempts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = quiz_attempts.student_id
      AND students.user_id = auth.uid()
    )
  );
```

## Kodlama Prensipleri

1. **KISS (Keep It Simple, Stupid)**
   - Her component tek bir işe odaklansın
   - 50 satırdan uzun component yok
   - Karmaşık state management yok (useState yeterli)

2. **No Over-Engineering**
   - Custom hook sadece 2+ yerde kullanılıyorsa
   - Abstraction sadece gerçekten gerekliyse
   - Third-party library minimumd tut

3. **Copy-Paste > Wrong Abstraction**
   - İlk versiyonda kod tekrarından korkma
   - Refactoring sonraya

4. **Inline First**
   - Styles: Tailwind classes inline
   - Functions: Component içinde tanımla
   - Types: Aynı dosyada tut

5. **Fast Feedback**
   - Her feature'ı hemen test edilebilir yap
   - Console.log > Fancy debugging
   - Hard-coded data ile başla

## Örnek Component Template

```tsx
// ❌ YAPMA
import { FC, useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StudentDashboardProps } from '@/types/dashboard'
import { fetchStudentData } from '@/lib/api'
import styles from './dashboard.module.css'

// ✅ YAP
'use client'
import { useState } from 'react'

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Kesirler Quiz 1", score: null },
    { id: 2, title: "Kesirler Quiz 2", score: 85 }
  ])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Öğrenci Paneli</h1>
      
      <div className="grid gap-4">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="border p-4 rounded">
            <h3>{quiz.title}</h3>
            <p>{quiz.score ? `Puan: ${quiz.score}` : 'Henüz çözülmedi'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Feature Implementation Order

### Week 1: Authentication & Base

```bash
# Day 1-2
npx create-next-app@latest i-ep --typescript --tailwind --app
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
# Setup Supabase project
# Create auth pages (login/register)

# Day 3-4
# Student dashboard with hardcoded data
# Parent invitation flow (just UI)

# Day 5-7
# Connect Supabase auth
# Test with real registration
```

### Week 2: Core Features

```bash
# Day 8-9
# Parent registration via invite link
# Parent dashboard

# Day 10-11
# Add math content (hardcoded)
# Quiz taking flow

# Day 12-14
# Teacher application form
# Admin panel (basic)
```

### Week 3: Polish & Deploy

```bash
# Day 15-18
# Fix bugs from user testing
# Add missing CRUD operations

# Day 19-21
# Deploy to Vercel
# Configure domain
# Test in production
```

### Week 4: Launch Prep

```bash
# Day 22-25
# Real user testing
# Critical bug fixes only

# Day 26-29
# Create simple landing page
# Final testing

# Day 30
# LAUNCH! 🚀
```

## Cursor AI Shortcuts

1. **Generate component:** `CMD+K` → "Create a simple login page with email and password, use Tailwind classes only"

2. **Fix error:** Select error → `CMD+K` → "Fix this TypeScript error"

3. **Add feature:** `CMD+K` → "Add forgot password link to login form"

4. **Refactor:** Select code → `CMD+K` → "Simplify this code"

5. **Generate API route:** `CMD+K` → "Create Next.js API route for parent invitation"

## Testing Checklist

- [ ] Student can register and login
- [ ] Student can invite parent (email sent)
- [ ] Parent can register via invite link
- [ ] Student can see lessons
- [ ] Student can take quiz
- [ ] Parent can see child's progress
- [ ] Teacher can apply
- [ ] Admin can approve teacher
- [ ] Mobile responsive (test on phone)
- [ ] Works on slow internet

## Common Pitfalls to Avoid

1. **Don't add "nice to have" features**
2. **Don't optimize prematurely**
3. **Don't write tests (manual test for MVP)**
4. **Don't create reusable components too early**
5. **Don't implement forgot password (do it manually)**
6. **Don't add animations**
7. **Don't implement real-time features**
8. **Don't create admin CRUD for content (hardcode it)**

## Debug Helpers

```tsx
// Add to any component for quick debugging
useEffect(() => {
  console.log('Component mounted:', { 
    user: session?.user,
    pathname: window.location.pathname 
  })
}, [])

// Quick error boundary
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>
  } catch (e) {
    return <div className="p-4 bg-red-100">Error: {e.message}</div>
  }
}
```

## Remember

- **Working > Perfect**
- **Today > Tomorrow**
- **Simple > Smart**
- **Done > Discussing**

Every line of code should move you closer to launch. If it doesn't, delete it.
