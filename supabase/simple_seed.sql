-- Basit sample içerikler (tek tek INSERT)

-- 1. Kesirler Dersi
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Kesirler - Giriş', 'math', 5, 'Kesirler', 'lesson', 
  '{"description": "Kesirlerin temel tanımı ve gösterimi", "sections": [{"title": "Kesir Nedir?", "content": "Kesir, bir bütünün eşit parçalarından bir veya birkaçını gösterir."}]}');

-- 2. Kesirler Quiz 1
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Kesirler Quiz 1', 'math', 5, 'Kesirler', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "questions": [{"id": 1, "question": "1/2 + 1/2 = ?", "options": ["1", "2", "1/4", "1/2"], "correct": 0}]}');

-- 3. Denklemler Dersi
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Denklemler - Giriş', 'math', 6, 'Denklemler', 'lesson',
  '{"description": "Birinci dereceden denklemler", "sections": [{"title": "Denklem Nedir?", "content": "Denklem, içinde bilinmeyen bulunan eşitliktir."}]}');

-- 4. Denklemler Quiz 1
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Denklemler Quiz 1', 'math', 6, 'Denklemler', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "questions": [{"id": 1, "question": "x + 5 = 10 ise x = ?", "options": ["5", "10", "15", "0"], "correct": 0}]}');

-- 5. Yüzde Dersi
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Yüzde - Giriş', 'math', 7, 'Yüzde', 'lesson',
  '{"description": "Yüzde hesaplamaları", "sections": [{"title": "Yüzde Nedir?", "content": "Yüzde, 100\'ün kesri olarak ifade edilen orandır."}]}');

-- 6. Yüzde Quiz 1
INSERT INTO content (title, subject, grade, topic, content_type, content_data) 
VALUES ('Yüzde Quiz 1', 'math', 7, 'Yüzde', 'quiz',
  '{"instructions": "Her sorunun tek doğru cevabı vardır.", "questions": [{"id": 1, "question": "80\'in %25\'i kaçtır?", "options": ["15", "20", "25", "30"], "correct": 1}]}'); 