'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import supabase from '@/lib/supabaseClient'
import { 
  User, Mail, Lock, GraduationCap, Users, BookOpen, 
  Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight,
  Sparkles, Heart, Star, Rocket, Shield
} from 'lucide-react'
import { validateEmail, validateRequired, getErrorMessage } from '@/utils/errorHandler'
import type { UserRole } from '@/types/database'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    role: 'student' as UserRole,
    grade: 5
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validation
      validateRequired(formData.email, 'E-posta')
      validateEmail(formData.email)
      validateRequired(formData.password, 'Şifre')
      validateRequired(formData.full_name, 'Ad Soyad')
      
      if (formData.password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır')
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Şifreler eşleşmiyor')
      }

      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            role: formData.role,
            grade: formData.role === 'student' ? formData.grade : null
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: authData.user.id,
            full_name: formData.full_name,
            role: formData.role,
            grade: formData.role === 'student' ? formData.grade : null,
            email: formData.email
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Don't throw here, user is already created
        }

        // Initialize user stats for students
        if (formData.role === 'student') {
          const { error: statsError } = await supabase
            .from('user_stats')
            .insert({
              user_id: authData.user.id,
              total_quizzes_completed: 0,
              total_correct_answers: 0,
              total_incorrect_answers: 0,
              average_accuracy: 0,
              total_time_spent: 0,
              total_points_earned: 0,
              favorite_subject: null
            })

          if (statsError) {
            console.error('Stats initialization error:', statsError)
          }
        }

        // Redirect based on role
        const redirectPath = formData.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'
        router.push(redirectPath)
      }

    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-4 rounded-3xl">
              <Sparkles className="w-12 h-12 text-white mx-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Hesap Oluştur</h1>
          <p className="text-gray-300 text-lg">
            Eğitim serüvenine başlayın
          </p>
        </div>

        {/* Registration Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-2xl opacity-30"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  E-posta *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Hesap Türü *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('role', 'student')}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.role === 'student'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">Öğrenci</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('role', 'teacher')}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.role === 'teacher'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white shadow-lg shadow-green-500/50'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">Öğretmen</div>
                  </button>
                </div>
              </div>

              {/* Grade Selection (Only for students) */}
              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Sınıf *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', parseInt(e.target.value))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={grade} className="bg-gray-800">
                        {grade}. Sınıf
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Şifre *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    placeholder="En az 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Şifre Tekrar *
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    placeholder="Şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Hesap Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <span>Hesap Oluştur</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-300">
                  Zaten hesabınız var mı?{' '}
                  <Link 
                    href="/login" 
                    className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300"
                  >
                    Giriş Yapın
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">İnteraktif Dersler</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <Rocket className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Quiz Sistemi</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Gamification</p>
          </div>
        </div>
      </div>
    </div>
  )
}