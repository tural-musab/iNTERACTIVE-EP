'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, User, Mail, ArrowLeft, UserCheck, BookOpen,
  GraduationCap, Award, CheckCircle2
} from 'lucide-react'

export default function TeacherRegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Başvuru gönderiliyor...')

    // Email zaten kayıtlı mı? (opsiyonel, ek kontrol)
    const { data: existing } = await supabase
      .from('teachers')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    if (existing) {
      setStatus('Bu e-posta ile başvuru yapılmış.')
      return
    }

    const { error } = await supabase
      .from('teachers')
      .insert([{ email, full_name: fullName }])

    if (error) {
      setStatus('Hata: ' + error.message)
    } else {
      setStatus('Başvurunuz alınmıştır. Admin onayı sonrası giriş yapabilirsiniz.')
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
          {/* Register Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <form
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
              onSubmit={handleRegister}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Öğretmen Başvurusu</h2>
                <p className="text-gray-300">Eğitim platformumuza katılın</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    type="text"
                    placeholder="Ad Soyad"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                type="submit"
              >
                Başvuru Gönder
              </button>
              
              {status && (
                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center">
                  <p className="text-white">{status}</p>
                </div>
              )}
            </form>
          </div>

          {/* Benefits Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">İçerik Oluşturma</h3>
                  <p className="text-gray-300 text-sm">Kendi derslerinizi ve quizlerinizi oluşturun</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Öğrenci Takibi</h3>
                  <p className="text-gray-300 text-sm">Öğrencilerinizin ilerlemesini takip edin</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Hızlı Onay</h3>
                  <p className="text-gray-300 text-sm">Başvurunuz 24 saat içinde değerlendirilir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
