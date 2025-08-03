-- Content tablosu için INSERT policy'si ekle
CREATE POLICY "Authenticated users can insert content" ON content
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Content tablosu için UPDATE policy'si ekle
CREATE POLICY "Content creators can update their content" ON content
  FOR UPDATE USING (auth.uid() IS NOT NULL); 