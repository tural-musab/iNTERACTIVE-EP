-- Sample matematik içerikleri ekle
INSERT INTO content (title, subject, grade, topic, content_type, content_data) VALUES
-- 5. Sınıf Kesirler Dersi
('Kesirler - Giriş', 'math', 5, 'Kesirler', 'lesson', 
  '{"description": "Kesirlerin temel tanımı ve gösterimi", "sections": [{"title": "Kesir Nedir?", "content": "Kesir, bir bütünün eşit parçalarından bir veya birkaçını gösterir.", "examples": ["1/2 = Bir bütünün yarısı", "3/4 = Dört eşit parçadan üçü"]}, {"title": "Kesir Çeşitleri", "content": "Basit kesir, bileşik kesir, tam sayılı kesir"}]}'),

-- 5. Sınıf Kesirler Quiz 1
('Kesirler Quiz 1', 'math', 5, 'Kesirler', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "time_limit": 15, "questions": [{"id": 1, "question": "1/2 + 1/2 = ?", "type": "multiple_choice", "options": ["1", "2", "1/4", "1/2"], "correct": 0, "points": 10}, {"id": 2, "question": "3/4 hangi kesre eşittir?", "type": "multiple_choice", "options": ["6/8", "4/3", "1/4", "2/4"], "correct": 0, "points": 10}, {"id": 3, "question": "Bir pizzanın 8 diliminden 3\'ünü yedik. Geriye ne kadar pizza kaldı?", "type": "multiple_choice", "options": ["3/8", "5/8", "8/3", "8/5"], "correct": 1, "points": 10}, {"id": 4, "question": "2/3 ile 4/6 kesirleri eşit midir?", "type": "true_false", "correct": true, "points": 10}], "passing_score": 60}'),

-- 6. Sınıf Denklemler Dersi
('Denklemler - Giriş', 'math', 6, 'Denklemler', 'lesson',
  '{"description": "Birinci dereceden denklemler", "sections": [{"title": "Denklem Nedir?", "content": "Denklem, içinde bilinmeyen bulunan eşitliktir.", "examples": ["x + 5 = 10", "2x = 8"]}, {"title": "Denklem Çözme", "content": "Bilinmeyeni yalnız bırakarak denklemi çözme"}]}'),

-- 6. Sınıf Denklemler Quiz 1
('Denklemler Quiz 1', 'math', 6, 'Denklemler', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "time_limit": 20, "questions": [{"id": 1, "question": "x + 5 = 10 ise x = ?", "type": "multiple_choice", "options": ["5", "10", "15", "0"], "correct": 0, "points": 10}, {"id": 2, "question": "2x = 8 ise x = ?", "type": "multiple_choice", "options": ["2", "4", "6", "8"], "correct": 1, "points": 10}, {"id": 3, "question": "3x - 6 = 9 ise x = ?", "type": "multiple_choice", "options": ["3", "5", "7", "9"], "correct": 1, "points": 10}, {"id": 4, "question": "x/2 = 4 ise x = ?", "type": "multiple_choice", "options": ["2", "4", "6", "8"], "correct": 3, "points": 10}], "passing_score": 60}'),

-- 7. Sınıf Yüzde Dersi
('Yüzde - Giriş', 'math', 7, 'Yüzde', 'lesson',
  '{"description": "Yüzde hesaplamaları", "sections": [{"title": "Yüzde Nedir?", "content": "Yüzde, 100\'ün kesri olarak ifade edilen orandır.", "examples": ["%25 = 25/100 = 1/4", "%50 = 50/100 = 1/2"]}, {"title": "Yüzde Hesaplama", "content": "Bir sayının yüzdesini bulma ve yüzde artış/azalış"}]}'),

-- 7. Sınıf Yüzde Quiz 1
('Yüzde Quiz 1', 'math', 7, 'Yüzde', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "time_limit": 15, "questions": [{"id": 1, "question": "80\'in %25\'i kaçtır?", "type": "multiple_choice", "options": ["15", "20", "25", "30"], "correct": 1, "points": 10}, {"id": 2, "question": "200\'ün %10\'u kaçtır?", "type": "multiple_choice", "options": ["10", "20", "30", "40"], "correct": 1, "points": 10}, {"id": 3, "question": "Bir ürün 100 TL\'den %20 indirimle satılıyor. Yeni fiyat kaç TL?", "type": "multiple_choice", "options": ["60", "70", "80", "90"], "correct": 2, "points": 10}, {"id": 4, "question": "50\'nin %40\'ı 20\'ye eşit midir?", "type": "true_false", "correct": true, "points": 10}], "passing_score": 60}');

-- Test öğrenci hesabı oluştur (eğer yoksa)
-- Bu kısım manuel olarak yapılmalı çünkü auth.users tablosu otomatik oluşturulur 