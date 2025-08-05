'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell, Edit, User,
  Mail, Plus, Trophy, Zap, Brain, Calculator, Play,
  Shield, Crown, Settings, Activity, Eye, CheckCircle,
  XCircle, AlertCircle, Send, Database, FileText, 
  UserCheck, Users2, BookOpenCheck, Lock, ArrowRight
} from 'lucide-react'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [grade, setGrade] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Yükleniyor...')
  
    // 1. Kullanıcıyı auth ile kaydet ve full_name bilgisini options.data ile gönder
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Formdan gelen tam isim
          role: 'student',     // Kullanıcı rolü
          grade: Number(grade) // Sınıf bilgisi
        }
      }
    })
  
    if (error) {
      setStatus(error.message)
      return
    }
  
    // 2. Kayıt başarılı - Artık eski students tablosuna insert yapmıyoruz
    // Veritabanı tetikleyicisi (trigger) otomatik olarak user_profiles tablosunu dolduracak
    setStatus('Kayıt başarılı! Lütfen e-posta adresinizi onaylayın.')
  }
      
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
                <h1 className="text-2xl font-bold text-white">Öğrenci Kaydı</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-pink-400 to-violet-500 text-white text-sm font-medium rounded-full">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Yeni Hesap
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-violet-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Öğrenci Kaydı
              </h2>
              <p className="text-gray-300">Eğitim yolculuğuna başla!</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="email"
                  placeholder="E-posta adresi"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="text"
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  required
                >
                  <option value="" className="bg-gray-800">Sınıf seçin</option>
                  {[5, 6, 7, 8, 9, 10, 11].map(gradeNum => (
                    <option key={gradeNum} value={gradeNum} className="bg-gray-800">
                      {gradeNum}. Sınıf
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                type="submit"
              >
                <UserPlus className="w-5 h-5" />
                <span>Kayıt Ol</span>
              </button>

              {status && (
                <div className="mt-4 p-4 bg-white/10 rounded-2xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Bell className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">{status}</p>
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-gray-300 text-sm">
                  Zaten hesabın var mı?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-pink-400 hover:text-pink-300 transition-colors duration-300 font-semibold"
                  >
                    Giriş Yap
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold text-white mb-6">
                Eğitim Yolculuğuna <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500">
                  Hoş Geldin!
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Modern eğitim platformumuzda öğrenmeyi keşfet ve başarıya ulaş!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">İnteraktif Dersler</h4>
                    <p className="text-gray-300 text-sm">Eğlenceli ve etkili öğrenme</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Quiz ve Testler</h4>
                    <p className="text-gray-300 text-sm">Bilgini test et ve geliştir</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Başarı Takibi</h4>
                    <p className="text-gray-300 text-sm">İlerlemeni gör ve ödüllendir</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Veli Takibi</h4>
                    <p className="text-gray-300 text-sm">Ailenle birlikte ilerle</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-violet-500/20 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Ücretsiz Başla</h4>
                  <p className="text-gray-300 text-sm">Hemen kayıt ol ve öğrenmeye başla!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
