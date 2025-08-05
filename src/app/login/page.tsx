'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, User, Lock, Mail, Eye, EyeOff, ArrowLeft,
  GraduationCap, UserCheck, Users, Shield
} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  // Şifre sıfırlama için eklenenler
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetStatus, setResetStatus] = useState('')

  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Giriş yapılıyor...')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setStatus(error.message)
      return
    }

    setStatus('Giriş başarılı! Yönlendiriliyorsunuz...')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setStatus('Kullanıcı bulunamadı.')
      return
    }

    // Yeni mimari: Tek bir user_profiles sorgusu ile rol kontrolü
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role, full_name')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      console.error('Profil yükleme hatası:', profileError)
      setStatus('Profil bilgileri yüklenirken hata oluştu.')
      return
    }

    if (!profile) {
      setStatus('Kullanıcı profili bulunamadı.')
      return
    }

    // Kullanıcıyı rolüne göre doğru dashboard'a yönlendir
    switch (profile.role) {
      case 'superadmin':
        router.push('/superadmin/dashboard')
        break
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'teacher':
        router.push('/teacher/dashboard')
        break
      case 'parent':
        router.push('/parent/dashboard')
        break
      case 'student':
        router.push('/student/dashboard')
        break
      default:
        setStatus('Geçersiz kullanıcı rolü.')
        break
    }
  }

  // Şifre sıfırlama fonksiyonu
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setResetStatus('Gönderiliyor...')
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)
    if (error) setResetStatus(error.message)
    else setResetStatus('Eğer e-posta ile kayıtlı bir hesabınız varsa, sıfırlama linki gönderildi.')
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
              <span className="text-2xl font-bold text-white">i-EP</span>
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

      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <form
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
              onSubmit={handleLogin}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz</h2>
                <p className="text-gray-300">Hesabınıza giriş yapın</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    type="password"
                    placeholder="Şifreniz"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="w-full mt-8 bg-gradient-to-r from-pink-500 to-violet-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                type="submit"
              >
                Giriş Yap
              </button>
              
              {status && (
                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center">
                  <p className="text-white">{status}</p>
                </div>
              )}

              <div className="text-center mt-6">
                <button
                  type="button"
                  className="text-yellow-300 hover:text-yellow-200 underline text-sm transition-colors duration-300"
                  onClick={() => setShowReset(true)}
                >
                  Şifremi Unuttum?
                </button>
              </div>
            </form>
          </div>

          {/* User Type Cards */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <GraduationCap className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Öğrenci</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <UserCheck className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Öğretmen</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Veli</p>
            </div>
          </div>
        </div>
      </div>

      {/* Şifre sıfırlama formu */}
      {showReset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <form
              onSubmit={handleResetPassword}
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Şifre Sıfırlama</h2>
                <p className="text-gray-300 text-sm">E-posta adresinizi girin</p>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  required
                  className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-violet-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Sıfırlama Linki Gönder
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all duration-300"
                  onClick={() => {
                    setShowReset(false)
                    setResetEmail('')
                    setResetStatus('')
                  }}
                >
                  Vazgeç
                </button>
              </div>
              
              {resetStatus && (
                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center">
                  <p className="text-white text-sm">{resetStatus}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
