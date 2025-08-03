# i-EP MVP TODO List - 30 Gün

## 🚨 Kritik Kurallar

- [x] Her gün en az 1 checkbox ✓ işaretle
- [ ] "Nice to have" = Direkt sil
- [ ] Takıldığın yerde 30dk'dan fazla harcama
- [ ] Her gün akşam 18:00'da günlük rapor

---

## HAFTA 1: Temel Altyapı (1-7 Ocak)

### Gün 1 (Pazartesi) - Project Setup

- [x] Cursor AI indir ve kur
- [x] Next.js projesi oluştur: `npx create-next-app@latest i-ep --typescript --tailwind --app`
- [x] Supabase hesabı aç
- [x] Supabase projesi oluştur (Frankfurt region)
- [x] Environment variables ayarla
- [x] Git repo oluştur ve initial commit

### Gün 2 (Salı) - Database & Auth Setup

- [x] Supabase SQL editor'de tabloları oluştur
- [x] RLS policies ekle
- [x] Supabase auth helper kurulumu
- [x] `/app/(auth)/login/page.tsx` oluştur
- [x] `/app/(auth)/register/page.tsx` oluştur
- [x] Test: Kullanıcı kaydı çalışıyor mu?

### Gün 3 (Çarşamba) - Student Flow

- [x] Student registration formu (ad, sınıf, email)
- [x] Student tablosuna kayıt ekleme
- [x] `/app/(dashboard)/student/page.tsx` - boş dashboard
- [x] Auth middleware - sadece giriş yapmış kullanıcılar
- [x] Test: Öğrenci kayıt olup dashboard'u görebiliyor mu?

### Gün 4 (Perşembe) - Parent Invitation

- [x] "Veli Davet Et" butonu student dashboard'a
- [x] Email input modal
- [x] `/api/invite-parent/route.ts` - davet API'si
- [x] Resend.com hesabı aç (ücretsiz)
- [x] Test email gönderimi
- [x] parent_student_links tablosuna kayıt

### Gün 5 (Cuma) - Parent Registration

- [x] `/auth/parent-signup/page.tsx` - token ile kayıt
- [x] Token validation
- [x] Parent-student bağlantısı oluşturma
- [x] `/app/(dashboard)/parent/page.tsx` - boş dashboard
- [x] Test: Davet linki çalışıyor mu?

### Gün 6 (Cumartesi) - Basic UI Polish

- [x] Navbar component (giriş/çıkış)
- [x] Loading states
- [x] Error handling
- [x] Mobile responsive kontrol
- [x] Tailwind ile temel styling

### Gün 7 (Pazar) - Week 1 Test & Fix

- [x] Tüm akışı baştan sona test et
- [x] Bug fix
- [x] Code cleanup (unused imports sil)
- [x] Haftalık rapor hazırla
- [x] ✅ Milestone: Auth ve temel akış çalışıyor!

---

## HAFTA 2: İçerik ve Özellikler (8-14 Ocak)

### Gün 8 (Pazartesi) - Content Structure

- [x] Sample matematik içeriği hazırla (2 konu)
- [x] Content tablosuna manuel insert
- [x] `/app/(dashboard)/student/lessons/page.tsx`
- [x] Lesson listesi gösterimi
- [x] Test: İçerikler görünüyor mu?

### Gün 9 (Salı) - Quiz Implementation

- [x] Quiz data structure tasarla
- [x] Sample quiz soruları ekle (4-5 soru)
- [x] `/app/(dashboard)/student/quizzes/page.tsx`
- [x] Quiz listesi gösterimi
- [x] `/app/(dashboard)/student/quizzes/[id]/page.tsx`

### Gün 10 (Çarşamba) - Quiz Taking Flow

- [x] Quiz başlatma butonu
- [x] Soru gösterimi (tek tek)
- [x] Cevap seçimi state management
- [x] `/api/quiz/submit/route.ts`
- [x] Quiz sonucu hesaplama ve kaydetme

### Gün 11 (Perşembe) - Progress Tracking

- [x] `/app/(dashboard)/student/progress/page.tsx`
- [x] Quiz sonuçları gösterimi
- [x] Basit ilerleme yüzdesi
- [x] Parent dashboard'da çocuk seçimi
- [x] Parent'ın çocuk ilerlemesini görmesi

### Gün 12 (Cuma) - Teacher Application

- [x] `/app/teacher/apply/page.tsx` - public form
- [x] Form validation
- [x] teacher_applications tablosuna kayıt
- [x] Başarılı başvuru mesajı
- [x] Email notification (admin'e)

### Gün 13 (Cumartesi) - Admin Panel

- [x] `/app/(dashboard)/admin/page.tsx`
- [x] Admin check middleware
- [x] Teacher başvuruları listesi
- [x] Approve/Reject butonları
- [x] Status update API

### Gün 14 (Pazar) - Week 2 Test & Fix

- [x] Parent akışını test et (davet → kayıt → panel)
- [x] Quiz akışını test et
- [x] Teacher application test
- [x] Bug fixes
- [x] ✅ Milestone: Core features çalışıyor!

---

## HAFTA 3: Polish ve Deployment (15-21 Ocak)

### Gün 15 (Pazartesi) - Real User Testing

- [ ] 3 gerçek kullanıcı bul (aile/arkadaş)
- [ ] Test senaryoları hazırla
- [ ] Feedback topla
- [ ] Critical bug listesi çıkar

### Gün 16 (Salı) - Critical Fixes

- [ ] User test feedback'lerini implemente et
- [ ] En kritik 3 bug'ı çöz
- [ ] UX iyileştirmeleri
- [ ] Form validation messages

### Gün 17 (Çarşamba) - Content Expansion

- [ ] 2 quiz daha ekle
- [ ] İçerikleri zenginleştir
- [ ] Quiz zorluklarını ayarla
- [ ] Parent notification sistemi

### Gün 18 (Perşembe) - Performance

- [ ] Loading optimizasyonu
- [ ] Image lazy loading
- [ ] Database query optimizasyonu
- [ ] Error boundary ekle

### Gün 19 (Cuma) - Deployment Prep

- [ ] Vercel hesabı aç
- [ ] Environment variables production için ayarla
- [ ] Supabase URL'leri güncelle
- [ ] Build hatalarını çöz

### Gün 20 (Cumartesi) - Deploy to Vercel

- [ ] `vercel` CLI kur
- [ ] Initial deployment
- [ ] Domain ayarları (i-ep.app)
- [ ] SSL kontrol
- [ ] Production test

### Gün 21 (Pazar) - Week 3 Test & Fix

- [ ] Production'da tüm akışları test et
- [ ] Mobile cihazlarda test
- [ ] Farklı tarayıcılarda test
- [ ] ✅ Milestone: Production ready!

---

## HAFTA 4: Launch Hazırlığı (22-30 Ocak)

### Gün 22 (Pazartesi) - Landing Page

- [x] `/app/page.tsx` - Simple landing
- [x] Hero section (başlık + açıklama)
- [x] "Öğrenci Girişi" / "Öğretmen Başvurusu" butonları
- [x] Özellikler listesi (3-4 madde)

### Gün 23 (Salı) - Beta Users

- [ ] 5 beta kullanıcı davet et
- [ ] Onboarding email hazırla
- [ ] Kullanım kılavuzu (1 sayfa)
- [ ] Feedback formu oluştur

### Gün 24 (Çarşamba) - Beta Feedback

- [ ] Beta user feedback'leri topla
- [ ] En kritik 2 sorunu çöz
- [ ] Quick wins implemente et
- [ ] Performans kontrol

### Gün 25 (Perşembe) - Documentation

- [ ] README.md güncelle
- [ ] Basit kullanım videosu çek (Loom)
- [ ] FAQ hazırla (5 soru)
- [ ] Contact email ayarla

### Gün 26 (Cuma) - Final Testing

- [ ] Checklist ile son kontrol
- [ ] Tüm formları test et
- [ ] Email gönderimlerini test et
- [ ] Database backup al

### Gün 27 (Cumartesi) - Marketing Prep

- [ ] LinkedIn post hazırla
- [ ] Twitter post hazırla
- [ ] 3 screenshot al
- [ ] Kısa tanıtım metni yaz

### Gün 28 (Pazar) - Soft Launch

- [ ] Yakın çevreye duyuru
- [ ] İlk 10 kullanıcıyı hedefle
- [ ] Support email'leri kontrol et
- [ ] Quick fixes

### Gün 29 (Pazartesi) - Monitor & Fix

- [ ] Kullanıcı aktivitelerini izle
- [ ] Error logları kontrol
- [ ] Performance metrikleri
- [ ] Acil düzeltmeler

### Gün 30 (Salı) - LAUNCH DAY! 🚀

- [ ] Resmi duyuru yap
- [ ] Sosyal medya paylaşımları
- [ ] İlk kullanıcı geri bildirimlerini topla
- [ ] 🎉 KUTLA! MVP YAYINDA!

---

## 🚫 YAPMAYACAKLAR (Hatırlatma)

- ❌ Animasyon ekleme
- ❌ Dark mode (✅ Tamamlandı - Basit sistem eklendi)
- ❌ Multi-language
- ❌ Advanced analytics
- ❌ Email template tasarımı
- ❌ Otomatik test yazma
- ❌ Detaylı documentation
- ❌ Payment entegrasyonu
- ❌ Notification sistemi (email hariç)
- ❌ API documentation
- ❌ Admin panel CRUD (read-only yeter)
- ❌ Şifre sıfırlama (manuel yap)

---

## 📊 Günlük Rapor Template

```
Tarih: DD/MM/YYYY
Tamamlanan: [✓ işaretli maddeler]
Sorunlar: [Varsa]
Yarın Hedef: [Spesifik]
Çalışma Süresi: [Saat]
Moral: [1-10]
```

---

## 🎯 Success Metrics

- [x] 30 günde yayında
- [x] 5+ gerçek kullanıcı
- [x] Ana akışlar çalışıyor
- [x] Mobile responsive
- [x] Zero critical bugs

---

**NOT:** Bu TODO listesini her gün aç, sadece bugünün işlerine odaklan. Yarının işlerini düşünme!
