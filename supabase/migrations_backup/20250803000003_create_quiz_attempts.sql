-- Create quiz_attempts table for tracking quiz completions
-- This table is used by the award-quiz-points Edge Function

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES content(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent INTEGER NOT NULL, -- milliseconds
  answers JSONB, -- Store student answers
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at ON quiz_attempts(completed_at);

-- RLS (Row Level Security) Policies
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view own quiz attempts
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = student_id);

-- Users can insert own quiz attempts
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Teachers can view quiz attempts for their students (if needed)
CREATE POLICY "Teachers can view student quiz attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role = 'teacher'
    )
  );

-- Grant permissions
GRANT ALL ON quiz_attempts TO authenticated;
GRANT ALL ON quiz_attempts TO service_role; 