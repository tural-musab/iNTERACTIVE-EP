'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Home, ArrowLeft, Lock, Key, Eye, EyeOff,
  CheckCircle2, AlertTriangle, Shield, User, LogIn, Mail,
  Zap, Brain, Users, BookOpen, Calculator, Play,
  Heart, Star, Trophy, Award, Clock, GraduationCap,
  UserCheck, Settings, HelpCircle, ExternalLink, RotateCcw,
  ArrowRight, XCircle, AlertCircle, RefreshCw, Save,
  Unlock, Fingerprint, LockKeyhole
} from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Hash’ten access_token'ı alıp session kur
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1) // "#" atla
      const params = new URLSearchParams(hash)
      const type = params.get('type')
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')
      if (type === 'recovery' && access_token && refresh_token) {
        supabase.auth.setSession({
          access_token,
          refresh_token,
        })
      }
    }
  }, [])

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('İşlem yapılıyor...')
    
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        setStatus(error.message)
      } else {
        setStatus('Şifre başarıyla değiştirildi! Giriş sayfasına yönlendiriliyorsunuz...')
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (error) {
      setStatus('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
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
                <h1 className="text-2xl font-bold text-white">Şifre Sıfırlama</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-full">
                  <Lock className="w-4 h-4 mr-1" />
                  Güvenli
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Reset Animation */}
          <div className="mb-8">
            <div className="w-48 h-48 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <LockKeyhole className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              Yeni Şifre Belirle
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Güvenliğiniz için yeni bir şifre belirleyin. 
              Şifreniz en az 6 karakter uzunluğunda olmalıdır.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>

            <form onSubmit={handleReset} className="max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="flex items-center space-x-3 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Yeni şifre"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 border-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || password.length < 6}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Güncelleniyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Şifreyi Güncelle</span>
                  </>
                )}
              </button>
            </form>

            {/* Status Message */}
            {status && (
              <div className={`mt-6 p-4 rounded-2xl backdrop-blur-lg ${
                status.includes('başarıyla') 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : status.includes('hata') || status.includes('error')
                  ? 'bg-red-500/20 border border-red-500/30'
                  : 'bg-blue-500/20 border border-blue-500/30'
              }`}>
                <div className="flex items-center space-x-3">
                  {status.includes('başarıyla') ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : status.includes('hata') || status.includes('error') ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
                  )}
                  <p className={`text-sm ${
                    status.includes('başarıyla') ? 'text-green-300' 
                    : status.includes('hata') || status.includes('error') 
                    ? 'text-red-300' 
                    : 'text-blue-300'
                  }`}>
                    {status}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Güvenlik İpuçları</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Güçlü Şifre</h4>
                    <p className="text-gray-300 text-sm">En az 8 karakter</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Büyük/küçük harf, sayı ve özel karakterler kullanın.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Benzersiz</h4>
                    <p className="text-gray-300 text-sm">Diğer hesaplarla aynı olmasın</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Her hesap için farklı şifre kullanın.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Güvenli</h4>
                    <p className="text-gray-300 text-sm">Kişisel bilgiler kullanmayın</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Doğum tarihi, isim gibi bilgiler kullanmayın.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-5 h-5" />
              <span>Giriş Yap</span>
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
