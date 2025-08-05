alter table "public"."content" drop constraint "content_content_type_check";

alter table "public"."content" add constraint "content_content_type_check" CHECK (((content_type)::text = ANY ((ARRAY['lesson'::character varying, 'quiz'::character varying])::text[]))) not valid;

alter table "public"."content" validate constraint "content_content_type_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_stats()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO user_streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.user_profiles (user_id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'student' -- Varsayılan olarak her yeni kullanıcı öğrenci olur.
  );
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_user_profile()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  user_role TEXT := 'student'; -- default role
  user_full_name TEXT;
  user_grade INTEGER;
BEGIN
  -- Extract data from auth.users.raw_user_meta_data (options.data)
  IF NEW.raw_user_meta_data IS NOT NULL THEN
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
    user_full_name := NEW.raw_user_meta_data->>'full_name';
    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;
  END IF;

  INSERT INTO user_profiles (
    user_id, 
    total_xp, 
    level, 
    role, 
    full_name, 
    email, 
    grade
  )
  VALUES (
    NEW.id, 
    0, 
    1, 
    user_role, 
    user_full_name, 
    NEW.email, 
    user_grade
  )
  ON CONFLICT (user_id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    grade = EXCLUDED.grade,
    updated_at = NOW();
  
  RETURN NEW;
END;
$function$
;


