'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  BookOpen, Brain, Trophy, Users, Star, ChevronRight, Menu, X, 
  Play, Target, Zap, Award, BarChart3, Clock, CheckCircle2,
  Calculator, Sparkles, Rocket, Heart, TrendingUp, Shield,
  User, GraduationCap, UserCheck
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ students: 0, lessons: 0, success: 0 });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && (hash.includes("type=signup") || hash.includes("type=recovery"))) {
        if (hash.includes("type=signup")) {
          router.replace(`/parent/complete${hash}`);
        } else if (hash.includes("type=recovery")) {
          router.replace(`/auth/reset${hash}`);
        }
      } else if (
        hash &&
        (hash.includes("error=access_denied") || hash.includes("error_code=otp_expired"))
      ) {
        router.replace("/auth/expired");
      }
    }

    // Animasyonlu sayaç
    const timer = setTimeout(() => {
      setAnimatedStats({
        students: 15000,
        lessons: 500,
        success: 98
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [router]);

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">i-EP</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110"
            >
              Ana Sayfa
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Öğrenci Girişi</span>
            </button>
            <button 
              onClick={() => router.push('/teacher/dashboard')}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <UserCheck className="w-5 h-5" />
              <span>Öğretmen Paneli</span>
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-900 to-indigo-900 border-t border-purple-700">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-white py-2 hover:text-yellow-300"
            >
              Ana Sayfa
            </button>
            <button 
              onClick={() => { router.push('/login'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-white py-2 hover:text-yellow-300"
            >
              Öğrenci Girişi
            </button>
            <button 
              onClick={() => { router.push('/teacher/dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-white py-2 hover:text-yellow-300"
            >
              Öğretmen Paneli
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
                <Rocket className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Türkiye'nin #1 Eğitim Platformu</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Matematik Öğrenmeyi
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">
                  Eğlenceli Hale Getiriyoruz!
                </span>
              </h1>
              <p className="text-xl text-gray-200">
                Öğrenciler, veliler ve öğretmenler için tasarlanmış modern eğitim platformu. 
                İnteraktif quizler ve oyunlaştırılmış öğrenme deneyimi ile başarıya ulaşın.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => router.push('/login')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Hemen Başla</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => router.push('/teacher/dashboard')}
                  className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
                >
                  Öğretmen Paneli
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                    <Brain className="w-12 h-12 text-yellow-300 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">{animatedStats.lessons}+</div>
                    <div className="text-gray-300">İnteraktif Ders</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                    <Users className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">{animatedStats.students.toLocaleString()}</div>
                    <div className="text-gray-300">Mutlu Öğrenci</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                    <Trophy className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">%{animatedStats.success}</div>
                    <div className="text-gray-300">Başarı Oranı</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                    <Star className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">4.9</div>
                    <div className="text-gray-300">Kullanıcı Puanı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Neden i-EP?
            </h2>
            <p className="text-xl text-gray-300">
              Eğitimi geleceğe taşıyan özelliklerimiz
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Oyunlaştırılmış Öğrenme</h3>
                <p className="text-gray-300">
                  Puanlar, rozetler ve liderlik tablosu ile öğrenmeyi eğlenceli hale getiriyoruz. 
                  Her başarı ödüllendirilir!
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-pink-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Kişiselleştirilmiş Öğrenme</h3>
                <p className="text-gray-300">
                  Yapay zeka destekli sistem, her öğrencinin öğrenme hızına ve tarzına uygun içerik sunar.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Detaylı İlerleme Takibi</h3>
                <p className="text-gray-300">
                  Öğrenciler, veliler ve öğretmenler için gerçek zamanlı performans analizleri ve raporlar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Hemen Başlayın</h2>
            <p className="text-xl text-gray-300 mb-8">
              Ücretsiz hesap oluşturun ve matematik öğrenme deneyimini keşfedin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => router.push('/login')}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Ücretsiz Başla</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => router.push('/teacher/register')}
                className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
              >
                Öğretmen Başvurusu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-300">
          <p>&copy; 2024 i-EP. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
