# 🚀 i-EP App

i-EP (Interactive Educational Platform) uygulaması - Next.js 15 ile geliştirilmiş modern eğitim platformu.

## 📋 Proje Hakkında

Bu klasör, i-EP projesinin ana uygulama kodlarını içerir. Next.js 15, TypeScript, Tailwind CSS ve Supabase kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🎮 Gamification Sistemi
- Puan ve seviye sistemi
- Başarı rozetleri (badges)
- Streak takibi
- Liderlik tablosu
- Motivasyon animasyonları

### 📱 Mobil Optimizasyon
- Touch gesture desteği
- Responsive tasarım
- Mobil performans monitoring
- Offline destek hazırlığı
- Progressive Web App (PWA) özellikleri

### 📊 Analitik ve Raporlama
- Öğrenci performans analizi
- Detaylı quiz sonuçları
- İlerleme takibi
- Veli bilgilendirme sistemi
- Öğretmen dashboard'u

### 🧩 Quiz Sistemi
- Çoklu quiz modları
- Adım adım soru gösterimi
- Anında geri bildirim
- Matematik formül desteği
- Ses efektleri

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Animasyonlar**: Framer Motion
- **State Management**: Zustand
- **UI Components**: Custom components + Lucide icons
- **Deployment**: Vercel (hazır)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı

### Adımlar

1. **Bağımlılıkları yükleyin**
```bash
npm install
```

2. **Environment variables ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Supabase veritabanını kurun**
```bash
# Supabase CLI ile
supabase init
supabase start
```

4. **Development server'ı başlatın**
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── student/           # Öğrenci sayfaları
│   ├── teacher/           # Öğretmen sayfaları
│   ├── parent/            # Veli sayfaları
│   ├── admin/             # Admin sayfaları
│   └── analytics/         # Analitik sayfaları
├── components/            # React bileşenleri
│   ├── mobile/           # Mobil optimizasyonlar
│   ├── gamification/     # Gamification bileşenleri
│   ├── quiz/             # Quiz bileşenleri
│   └── analytics/        # Analitik bileşenleri
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
├── services/             # API servisleri
├── types/                # TypeScript type definitions
└── utils/                # Yardımcı fonksiyonlar
```

## 🎯 Kullanıcı Rolleri

### 👨‍🎓 Öğrenci
- Quiz çözme
- İlerleme takibi
- Rozet kazanma
- Performans analizi

### 👨‍🏫 Öğretmen
- Quiz oluşturma
- Sınıf yönetimi
- Öğrenci takibi
- Raporlama

### 👨‍👩‍👧‍👦 Veli
- Çocuk takibi
- İlerleme raporları
- Bildirimler

### 👨‍💼 Admin
- Sistem yönetimi
- Kullanıcı yönetimi
- İçerik yönetimi

## 📱 Mobil Özellikler

### Touch Gestures
- Swipe left/right navigation
- Tap ve double tap
- Pinch to zoom
- Rotation gestures

### Performance Monitoring
- Real-time FPS tracking
- Memory usage monitoring
- Battery level tracking
- Network status monitoring

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly UI
- Optimized for all screen sizes

## 🧪 Test Süreçleri

### Otomatik Testler
- Cihaz algılama
- Dokunma hareketleri
- Responsive tasarım
- Performans testleri
- Ağ bağlantısı

### Manuel Testler
- Touch gesture testleri
- Performance testleri
- Accessibility testleri

## 📊 Performans Metrikleri

| Metrik | Hedef | Durum |
|--------|-------|-------|
| FPS | 60+ | ✅ Monitoring aktif |
| Bellek Kullanımı | <50MB | ✅ Tracking aktif |
| Yükleme Süresi | <2s | ✅ Ölçüm aktif |
| Performans Skoru | 80+ | ✅ Hesaplama aktif |

## 🔧 Geliştirme

### Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

### Kod Standartları

- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Component-based architecture

## 📚 Dokümantasyon

- [Mobil Entegrasyon Rehberi](docs/MOBILE_INTEGRATION_GUIDE.md)
- [Gamification Sistemi](../development-plans/GAMIFICATION_GUIDE.md)
- [Quiz İyileştirmeleri](../development-plans/QUIZ_IMPROVEMENTS.md)
- [MVP Roadmap](../development-plans/ek/MVP%20Roadmap%20ve%20İmplementasyon%20Planı.md)

## 🚀 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com)'e giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Environment variables'ları ayarlayın
5. Deploy edin

### Environment Variables (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Geliştirici

**Tural Musab** - [GitHub](https://github.com/tural-musab)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

---

**Son Güncelleme**: 2024-12-19  
**Versiyon**: 1.0.0  
**Durum**: Development
