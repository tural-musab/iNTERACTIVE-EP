-- Content tablosu için INSERT policy'si ekle
DROP POLICY IF EXISTS "Authenticated users can insert content" ON content;
CREATE POLICY "Authenticated users can insert content" ON content
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Content tablosu için UPDATE policy'si ekle
DROP POLICY IF EXISTS "Content creators can update their content" ON content;
CREATE POLICY "Content creators can update their content" ON content
  FOR UPDATE USING (auth.uid() = creator_id); 