# **Supabase Veritabanı ve Güvenlik Mimarisi Kuralları**

**DİKKAT: Bu belgedeki kurallar kesindir ve asla ihlal edilmemelidir.** Veritabanı ile ilgili tüm işlemler (yeni tablolar, sütunlar, RLS politikaları, migration'lar) bu kurallara %100 uymak zorundadır.

## **0\. Başlangıç Noktası ve Tek Gerçek Kaynak**

Projenin mevcut veritabanı şemasının tam ve doğru hali, supabase/migrations/20250805000000\_initial\_schema.sql dosyasında tanımlanmıştır. Bu dosya, projenin başlangıç noktasıdır.

**Tüm yeni veritabanı değişiklikleri, bu temel şemanın üzerine, yeni migration dosyaları oluşturularak eklenmelidir.**

## **1\. Temel Mimari Kuralları**

* **TEK PROFİL TABLOSU:** Kullanıcı rolleri (student, parent, teacher vb.) için asla ayrı tablolar oluşturma. Tüm kullanıcılar, tek ve merkezi olan public.user\_profiles tablosunda tutulur.  
* **role SÜTUNU ZORUNLUDUR:** user\_profiles tablosu, bir kullanıcının tipini belirten role adında bir user\_role ENUM sütununa sahiptir. Tüm yetkilendirme bu sütuna göre yapılır.  
* **İLİŞKİLER İÇİN BAĞLANTI TABLOLARI:** Kullanıcılar arasındaki ilişkiler (veli-öğrenci, öğretmen-öğrenci) sadece parent\_student\_links ve teacher\_student\_links gibi bağlantı tabloları üzerinden yönetilir.

## **2\. Row Level Security (RLS) Politikası Kuralları**

* **VARSAYILAN REDDETME:** Tüm tablolarda RLS etkin olmalıdır. Bir politika açıkça izin vermediği sürece hiçbir veriye erişilemez.  
* **ROL BAZLI YETKİLENDİRME:** Tüm RLS politikaları, (SELECT role FROM public.user\_profiles WHERE user\_id \= auth.uid()) sorgusu ile kullanıcının rolünü kontrol etmelidir.  
* **public ROLÜ YASAKTIR:** teacher\_applications (başvuru) ve daily\_leaderboard (okuma) gibi istisnalar dışında, hiçbir politika public rolüne atanmamalıdır. Varsayılan rol her zaman authenticated olmalıdır.  
* **CLIENT-SIDE YAZMA YASAĞI:** point\_history, user\_badges gibi hassas tablolara kullanıcıların doğrudan veri eklemesi (INSERT) her zaman engellenmelidir (false kuralı ile). Bu işlemler sadece Edge Functions üzerinden yapılabilir.

## **3\. Migration (Veritabanı Değişikliği) Kuralları**

* **ASLA DOĞRUDAN DEĞİŞİKLİK YAPMA:** Supabase dashboard'u üzerinden asla tablo veya politika değişikliği yapma.  
* **SADECE MIGRATION DOSYASI:** Tüm veritabanı şeması değişiklikleri, supabase/migrations klasöründe yeni bir SQL dosyası oluşturularak yapılmalıdır.  
* **RLS'İ UNUTMA:** Yeni bir tablo oluşturan her migration dosyası, o tablo için gerekli olan RLS politikalarını da içermek ZORUNDADIR.

## **4\. Seeding (Başlangıç Verisi) Kuralları (YENİ EKLENDİ)**

* **TEK SEED DOSYASI:** Geliştirme ortamını test verileriyle doldurmak için kullanılacak tek dosya, supabase/seed.sql dosyasıdır.  
* **OTOMATİK ÇALIŞMA:** Bu dosya, npx supabase db reset komutu çalıştırıldığında, migration'lar tamamlandıktan sonra otomatik olarak çalıştırılır.  
* **UYUMLULUK:** seed.sql dosyasının içeriği, her zaman en güncel veritabanı mimarisiyle (initial\_schema.sql ve sonraki migration'lar) uyumlu olmalıdır. Eski veya geçersiz sütunlara veri eklemeye çalışmamalıdır.
