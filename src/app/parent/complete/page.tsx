'use client'
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell, Edit, User,
  Mail, Plus, Trophy, Zap, Brain, Calculator, Play,
  Shield, Crown, Settings, Activity, Eye, CheckCircle,
  XCircle, AlertCircle, Send, Database, FileText, 
  UserCheck, Users2, BookOpenCheck, Lock, ArrowRight,
  UserCheck2, HeartHandshake, CheckCircle2 as CheckCircleIcon
} from 'lucide-react'

function ParentCompleteContent() {
  const [status, setStatus] = useState("Kayıt onaylanıyor...");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    // Otomatik login işlemi (isteğe bağlı), ya da sadece mesaj gösterimi
    async function checkUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setStatus("Kayıt onaylandı! Artık giriş yapabilirsin.");
        setTimeout(() => router.push("/parent/login"), 2500);
      } else if (error) {
        setStatus("Kayıt tamamlanamadı: " + error.message);
      }
    }
    checkUser();
  }, [router, params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Veli Kayıt Onayı</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-full">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Tamamlanıyor
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircleIcon className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Kayıt Tamamlandı! 🎉
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {status}
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Hoş Geldiniz!</h4>
                  <p className="text-gray-300 text-sm">Artık çocuğunuzun eğitim yolculuğuna katılabilirsiniz.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">İlerleme Takibi</h4>
                  <p className="text-gray-300 text-sm">Çocuğunuzun gelişimini izleyin</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Bildirimler</h4>
                  <p className="text-gray-300 text-sm">Önemli gelişmelerden haberdar olun</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">İletişim</h4>
                  <p className="text-gray-300 text-sm">Öğretmenlerle iletişime geçin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Dashboard&apos;a Git</span>
            </button>
            
            <button
              onClick={() => router.push('/login')}
              className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Giriş Yap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParentCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircleIcon className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Yükleniyor...</h2>
          <p className="text-gray-300">Kayıt bilgileri kontrol ediliyor</p>
        </div>
      </div>
    }>
      <ParentCompleteContent />
    </Suspense>
  );
}
