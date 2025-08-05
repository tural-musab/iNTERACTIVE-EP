-- Update user_profiles table to include role, full_name, email, grade fields
-- and update the trigger to handle options.data from auth.signUp

-- 1. Add new columns to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student',
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS grade INTEGER;

-- 2. Create index for role-based queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- 3. Update the create_user_profile function to handle options.data
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- 4. Update RLS policies to include role-based access
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Add policy for role-based queries (for admin purposes)
CREATE POLICY "Users can view profiles by role" ON user_profiles
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- 5. Grant permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_profiles TO service_role; 