-- Add creator_id to content table
-- This links content to the user who created it

-- Add creator_id column
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_content_creator_id ON content(creator_id);

-- Update RLS policy to allow content creators to manage their content
DROP POLICY IF EXISTS "Content creators can update their content" ON content;
CREATE POLICY "Content creators can update their content" ON content
  FOR UPDATE USING (
    auth.uid() = creator_id OR 
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Add policy for content creators to delete their content
DROP POLICY IF EXISTS "Content creators can delete their content" ON content;
CREATE POLICY "Content creators can delete their content" ON content
  FOR DELETE USING (
    auth.uid() = creator_id OR 
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  ); 