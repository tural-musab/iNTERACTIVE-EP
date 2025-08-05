'use client'

import { useState } from 'react'
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
  UserCheck, Users2, BookOpenCheck, Lock, ArrowRight,
  UserCheck2, HeartHandshake
} from 'lucide-react'

export default function ParentRegisterPage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Kayıt yapılıyor...')

    // --- ADIM 1: Davet var mı kontrol et ---
    const { data: linkData, error: linkError } = await supabase
      .from('parent_student_links')
      .select('*')
      .is('parent_id', null)
      .eq('status', 'pending')
      .eq('invited_email', email) // <-- Bu kolonun olduğundan emin ol!
      .maybeSingle()

    if (!linkData) {
      setStatus('Bu e-posta için bir öğrenci daveti bulunamadı.')
      return
    }

    // --- Devamı eski gibi ---
    // 2. Auth ile Supabase'e kullanıcı olarak ekle ve full_name bilgisini options.data ile gönder
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Formdan gelen tam isim
          role: 'parent'       // Kullanıcı rolü
        }
      }
    })
    if (signUpError) {
      setStatus('Hata: ' + signUpError.message)
      return
    }

    // 3. Kayıt başarılı - Artık eski parents tablosuna insert yapmıyoruz
    // Veritabanı tetikleyicisi (trigger) otomatik olarak user_profiles tablosunu dolduracak

    // 4. parent_student_links tablosunu güncelle
    await supabase
      .from('parent_student_links')
      .update({
        parent_id: signUpData.user?.id, // Artık user_id'yi kullanıyoruz
        status: 'confirmed',
        confirmed_at: new Date(),
      })
      .eq('id', linkData.id)

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
                <h1 className="text-2xl font-bold text-white">Veli Kaydı</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-full">
                  <Users className="w-4 h-4 mr-1" />
                  Aile Hesabı
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
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <UserCheck2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Veli Kaydı
              </h2>
              <p className="text-gray-300">Çocuğunuzun eğitim yolculuğuna katılın!</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="text"
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                type="submit"
              >
                <UserCheck2 className="w-5 h-5" />
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
                    className="text-green-400 hover:text-green-300 transition-colors duration-300 font-semibold"
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
                Çocuğunuzun Eğitimine <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Katılın!
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Çocuğunuzun öğrenme yolculuğunu takip edin ve destekleyin!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <h4 className="text-white font-semibold text-lg">Anlık Bildirimler</h4>
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
                    <h4 className="text-white font-semibold text-lg">Öğretmen İletişimi</h4>
                    <p className="text-gray-300 text-sm">Öğretmenlerle doğrudan iletişim</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Başarı Ödülleri</h4>
                    <p className="text-gray-300 text-sm">Çocuğunuzun başarılarını kutlayın</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Aile Desteği</h4>
                  <p className="text-gray-300 text-sm">Çocuğunuzun eğitiminde aktif rol alın!</p>
                </div>
              </div>
            </div>

            {/* Invitation Notice */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Davet Gerekli</h4>
                  <p className="text-gray-300 text-sm">Kayıt olmak için çocuğunuzdan davet almanız gerekiyor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
