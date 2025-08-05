-- Initial Schema for Interactive EP Application
-- Extracted from yeni_temiz_sema.sql
-- Only includes public schema objects and auth.users triggers

-- Create user role enum
CREATE TYPE public.user_role AS ENUM (
    'superadmin',
    'admin',
    'teacher',
    'student',
    'parent'
);

ALTER TYPE public.user_role OWNER TO postgres;

-- Create public functions
CREATE FUNCTION public.calculate_level(xp integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
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
$$;

ALTER FUNCTION public.calculate_level(xp integer) OWNER TO postgres;

CREATE FUNCTION public.create_user_profile() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
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
$$;

ALTER FUNCTION public.create_user_profile() OWNER TO postgres;

CREATE FUNCTION public.update_user_profile_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

ALTER FUNCTION public.update_user_profile_timestamp() OWNER TO postgres;

-- Create public tables
CREATE TABLE public.analytics_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    event_type text NOT NULL,
    event_data jsonb,
    session_id text,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.analytics_events OWNER TO postgres;

CREATE TABLE public.content (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    subject character varying(50) DEFAULT 'math'::character varying,
    grade integer,
    topic character varying(255),
    content_type character varying(20),
    content_data jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    creator_id uuid,
    CONSTRAINT content_content_type_check CHECK (((content_type)::text = ANY ((ARRAY['lesson'::character varying, 'quiz'::character varying])::text[])))
);

ALTER TABLE public.content OWNER TO postgres;

CREATE TABLE public.daily_leaderboard (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    username text NOT NULL,
    avatar_url text,
    daily_points integer DEFAULT 0,
    rank integer,
    date date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.daily_leaderboard OWNER TO postgres;

CREATE TABLE public.parent_student_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    parent_id uuid,
    student_id uuid,
    status text DEFAULT 'pending'::text,
    invited_at timestamp without time zone DEFAULT now(),
    confirmed_at timestamp without time zone,
    invited_email text
);

ALTER TABLE public.parent_student_links OWNER TO postgres;

CREATE TABLE public.point_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    points integer NOT NULL,
    reason text NOT NULL,
    quiz_id uuid,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT point_history_reason_check CHECK ((reason = ANY (ARRAY['quiz_completion'::text, 'streak_bonus'::text, 'achievement'::text, 'daily_login'::text, 'speed_bonus'::text, 'perfect_score'::text])))
);

ALTER TABLE public.point_history OWNER TO postgres;

CREATE TABLE public.quiz_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    quiz_id uuid NOT NULL,
    assigned_to_user_id uuid,
    assigned_to_grade integer,
    assigned_by uuid NOT NULL
);

ALTER TABLE public.quiz_assignments OWNER TO postgres;

CREATE TABLE public.quiz_attempts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    student_id uuid,
    quiz_id uuid,
    score numeric(5,2),
    answers jsonb,
    time_spent integer,
    completed_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.quiz_attempts OWNER TO postgres;

CREATE TABLE public.teacher_applications (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(20),
    subjects text[],
    experience text,
    status character varying(20) DEFAULT 'pending'::character varying,
    applied_at timestamp without time zone DEFAULT now(),
    reviewed_at timestamp without time zone,
    reviewed_by uuid
);

ALTER TABLE public.teacher_applications OWNER TO postgres;

CREATE TABLE public.teacher_student_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    teacher_id uuid NOT NULL,
    student_id uuid NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);

ALTER TABLE public.teacher_student_links OWNER TO postgres;

CREATE TABLE public.user_badges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    badge_id text NOT NULL,
    badge_name text NOT NULL,
    badge_description text,
    badge_icon text,
    badge_category text,
    badge_rarity text,
    points_reward integer DEFAULT 0,
    awarded_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_badges_badge_category_check CHECK ((badge_category = ANY (ARRAY['achievement'::text, 'streak'::text, 'quiz'::text, 'social'::text]))),
    CONSTRAINT user_badges_badge_rarity_check CHECK ((badge_rarity = ANY (ARRAY['common'::text, 'rare'::text, 'epic'::text, 'legendary'::text])))
);

ALTER TABLE public.user_badges OWNER TO postgres;

CREATE TABLE public.user_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    total_xp integer DEFAULT 0,
    level integer DEFAULT 1,
    avatar text,
    display_name text,
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    full_name text,
    email text,
    role public.user_role DEFAULT 'student'::public.user_role NOT NULL,
    grade integer
);

ALTER TABLE public.user_profiles OWNER TO postgres;

CREATE TABLE public.user_stats (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    total_quizzes_completed integer DEFAULT 0,
    total_correct_answers integer DEFAULT 0,
    total_incorrect_answers integer DEFAULT 0,
    average_accuracy numeric(5,2) DEFAULT 0,
    total_time_spent integer DEFAULT 0,
    total_points_earned integer DEFAULT 0,
    favorite_subject text,
    last_activity timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.user_stats OWNER TO postgres;

CREATE TABLE public.user_streaks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    current_streak integer DEFAULT 0,
    longest_streak integer DEFAULT 0,
    last_activity_date date DEFAULT CURRENT_DATE,
    streak_type text DEFAULT 'daily'::text,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_streaks_streak_type_check CHECK ((streak_type = ANY (ARRAY['daily'::text, 'weekly'::text, 'quiz'::text])))
);

ALTER TABLE public.user_streaks OWNER TO postgres;

-- Create indexes on public tables
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events USING btree (created_at);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events USING btree (user_id);
CREATE INDEX idx_content_creator_id ON public.content USING btree (creator_id);
CREATE INDEX idx_daily_leaderboard_date ON public.daily_leaderboard USING btree (date);
CREATE INDEX idx_point_history_created_at ON public.point_history USING btree (created_at);
CREATE INDEX idx_point_history_user_id ON public.point_history USING btree (user_id);
CREATE INDEX idx_quiz_attempts_completed_at ON public.quiz_attempts USING btree (completed_at);
CREATE INDEX idx_quiz_attempts_quiz_id ON public.quiz_attempts USING btree (quiz_id);
CREATE INDEX idx_quiz_attempts_student_id ON public.quiz_attempts USING btree (student_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges USING btree (user_id);
CREATE INDEX idx_user_profiles_email ON public.user_profiles USING btree (email);
CREATE INDEX idx_user_profiles_level ON public.user_profiles USING btree (level);
CREATE INDEX idx_user_profiles_role ON public.user_profiles USING btree (role);
CREATE INDEX idx_user_profiles_total_xp ON public.user_profiles USING btree (total_xp);
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles USING btree (user_id);
CREATE INDEX idx_user_stats_user_id ON public.user_stats USING btree (user_id);

-- Enable Row Level Security on all public tables
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

-- Create policies for public tables
CREATE POLICY "Adminler öğretmen başvurularını görebilir" ON public.teacher_applications FOR SELECT TO authenticated USING ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role])));

CREATE POLICY "Adminler öğretmen başvurularını güncelleyebilir" ON public.teacher_applications FOR UPDATE TO authenticated USING ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role]))) WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role])));

CREATE POLICY "Client-side eklemeler engellendi" ON public.analytics_events FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Client-side eklemeler engellendi" ON public.daily_leaderboard FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Client-side eklemeler engellendi" ON public.point_history FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Client-side eklemeler engellendi" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Client-side yazma işlemleri engellendi (stats)" ON public.user_stats USING (false) WITH CHECK (false);

CREATE POLICY "Client-side yazma işlemleri engellendi (streaks)" ON public.user_streaks USING (false) WITH CHECK (false);

CREATE POLICY "Herkes liderlik tablosunu görebilir" ON public.daily_leaderboard FOR SELECT USING (true);

CREATE POLICY "Herkes öğretmenlik başvurusu yapabilir" ON public.teacher_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Kullanıcılar ilgili quizleri görebilir" ON public.content FOR SELECT TO authenticated USING (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.quiz_assignments
  WHERE ((quiz_assignments.quiz_id = content.id) AND ((quiz_assignments.assigned_to_user_id = auth.uid()) OR (quiz_assignments.assigned_to_grade = ( SELECT content.grade
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid())))))))));

CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir" ON public.user_profiles FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Quiz'i sadece oluşturanlar veya Adminler güncelleyebilir" ON public.content FOR UPDATE TO authenticated USING (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role))) WITH CHECK (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role)));

CREATE POLICY "Rol bazlı profil görüntüleme kuralları" ON public.user_profiles FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles_1.role
   FROM public.user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (role = 'teacher'::public.user_role) OR ((( SELECT user_profiles_1.role
   FROM public.user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid())) = 'teacher'::public.user_role) AND (role = 'student'::public.user_role) AND (NOT (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE (teacher_student_links.student_id = user_profiles.user_id)))))));

CREATE POLICY "Öğrenciler veli daveti oluşturabilir" ON public.parent_student_links FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));

CREATE POLICY "Öğrenciler yeni quiz denemesi ekleyebilir" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));

CREATE POLICY "Öğrenciler öğretmene başvurabilir" ON public.teacher_student_links FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));

CREATE POLICY "Öğretmenler başvuru durumunu güncelleyebilir" ON public.teacher_student_links FOR UPDATE TO authenticated USING (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'teacher'::public.user_role) AND (auth.uid() = teacher_id))) WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'teacher'::public.user_role) AND (auth.uid() = teacher_id)));

CREATE POLICY "Öğretmenler ve Adminler quiz atayabilir" ON public.quiz_assignments FOR INSERT TO authenticated WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['teacher'::public.user_role, 'admin'::public.user_role, 'superadmin'::public.user_role])));

CREATE POLICY "Öğretmenler ve Adminler quiz oluşturabilir" ON public.content FOR INSERT TO authenticated WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['teacher'::public.user_role, 'superadmin'::public.user_role])));

CREATE POLICY "İlgili taraflar ve Adminler analizleri görebilir" ON public.analytics_events FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = analytics_events.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = analytics_events.user_id))))));

CREATE POLICY "İlgili taraflar ve Adminler atamaları görebilir" ON public.quiz_assignments FOR SELECT TO authenticated USING (((assigned_to_user_id = auth.uid()) OR (assigned_by = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));

CREATE POLICY "İlgili taraflar ve Adminler bağlantıyı görebilir" ON public.parent_student_links FOR SELECT TO authenticated USING (((auth.uid() = parent_id) OR (auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));

CREATE POLICY "İlgili taraflar ve Adminler bağlantıyı görebilir" ON public.teacher_student_links FOR SELECT TO authenticated USING (((auth.uid() = teacher_id) OR (auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));

CREATE POLICY "İlgili taraflar ve Adminler denemeleri görebilir" ON public.quiz_attempts FOR SELECT TO authenticated USING (((auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = quiz_attempts.student_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = quiz_attempts.student_id))))));

CREATE POLICY "İlgili taraflar ve Adminler istatistikleri görebilir" ON public.user_stats FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_stats.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_stats.user_id))))));

CREATE POLICY "İlgili taraflar ve Adminler puanları görebilir" ON public.point_history FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = point_history.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = point_history.user_id))))));

CREATE POLICY "İlgili taraflar ve Adminler rozetleri görebilir" ON public.user_badges FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_badges.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_badges.user_id))))));

CREATE POLICY "İlgili taraflar ve Adminler serileri görebilir" ON public.user_streaks FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_streaks.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_streaks.user_id))))));

-- Create triggers on auth.users table
CREATE TRIGGER create_user_profile_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();

-- Create trigger on public.user_profiles table
CREATE TRIGGER update_user_profile_timestamp_trigger BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_user_profile_timestamp();
