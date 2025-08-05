-- Bu migration, user_stats ve user_streaks tablolarındaki RLS güvenlik açığını düzeltir.

-- 1. ADIM: Eski ve güvensiz politikaları temizle
DROP POLICY IF EXISTS "System can manage stats" ON public.user_stats;
DROP POLICY IF EXISTS "System can manage streaks" ON public.user_streaks;
-- Önceki RLS denemelerinden kalmış olabilecek diğer politikaları da temizleyelim.
DROP POLICY IF EXISTS "İlgili taraflar ve Adminler istatistikleri görebilir" ON public.user_stats;
DROP POLICY IF EXISTS "İlgili taraflar ve Adminler serileri görebilir" ON public.user_streaks;


-- 2. ADIM: user_stats için güvenli politikaları oluştur

-- Kural 1: Sadece yetkili kişilerin verileri GÖRMESİNE (SELECT) izin ver.
CREATE POLICY "İlgili taraflar ve Adminler istatistikleri görebilir" ON public.user_stats
FOR SELECT TO authenticated USING (
  (auth.uid() = user_id) OR
  ((SELECT role FROM public.user_profiles WHERE user_id = auth.uid()) IN ('admin', 'superadmin')) OR
  (EXISTS (SELECT 1 FROM public.parent_student_links WHERE parent_student_links.parent_id = auth.uid() AND parent_student_links.student_id = user_stats.user_id)) OR
  (EXISTS (SELECT 1 FROM public.teacher_student_links WHERE teacher_student_links.teacher_id = auth.uid() AND teacher_student_links.student_id = user_stats.user_id))
);

-- Kural 2: YAZMA, GÜNCELLEME, SİLME (ALL) işlemlerini istemci tarafından tamamen engelle.
CREATE POLICY "Client-side yazma işlemleri engellendi (stats)" ON public.user_stats
FOR ALL USING (false) WITH CHECK (false);


-- 3. ADIM: user_streaks için güvenli politikaları oluştur

-- Kural 1: Sadece yetkili kişilerin verileri GÖRMESİNE (SELECT) izin ver.
CREATE POLICY "İlgili taraflar ve Adminler serileri görebilir" ON public.user_streaks
FOR SELECT TO authenticated USING (
  (auth.uid() = user_id) OR
  ((SELECT role FROM public.user_profiles WHERE user_id = auth.uid()) IN ('admin', 'superadmin')) OR
  (EXISTS (SELECT 1 FROM public.parent_student_links WHERE parent_student_links.parent_id = auth.uid() AND parent_student_links.student_id = user_streaks.user_id)) OR
  (EXISTS (SELECT 1 FROM public.teacher_student_links WHERE teacher_student_links.teacher_id = auth.uid() AND teacher_student_links.student_id = user_streaks.user_id))
);

-- Kural 2: YAZMA, GÜNCELLEME, SİLME (ALL) işlemlerini istemci tarafından tamamen engelle.
CREATE POLICY "Client-side yazma işlemleri engellendi (streaks)" ON public.user_streaks
FOR ALL USING (false) WITH CHECK (false);