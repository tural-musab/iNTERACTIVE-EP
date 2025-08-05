'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserProfile } from '@/types/user'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell, Edit, User,
  Mail, Plus, Trophy, Zap, Brain, Calculator, Play,
  Shield, Crown, Settings, Activity, Eye, CheckCircle,
  XCircle, AlertCircle, Send, Database, FileText, 
  UserCheck, Users2, BookOpenCheck
} from 'lucide-react'

interface Content {
  id: string
  title: string
  content_type: string
  subject: string
  grade: number
  created_at: string
}

export default function AdminDashboard() {
  const [contents, setContents] = useState<Content[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const router = useRouter()

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      
      try {
        // Fetch contents
        const { data: contentData, error: contentError } = await supabase
          .from('content')
          .select('id, title, content_type, subject, grade, created_at')
          .order('created_at', { ascending: false })
          .limit(10)

        if (contentError) {
          console.error('Content fetch error:', contentError)
        } else {
          setContents(contentData || [])
        }

        // Fetch users (students and teachers)
        const { data: userData, error: userError } = await supabase
          .from('user_profiles')
          .select('id, email, role, created_at')
          .in('role', ['student', 'teacher'])
          .order('created_at', { ascending: false })
          .limit(5)

        if (userError) {
          console.error('User fetch error:', userError)
        } else {
          const users = (userData || []).map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at
          }))
          setUsers(users)
        }

      } catch (error) {
        console.error('Fetch error:', error)
        setStatus('Veri yükleme hatası')
      }
      
      setLoading(false)
    }

    fetchData()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalContents = contents.length
  const totalUsers = users.length
  const lessonsCount = contents.filter(c => c.content_type === 'lesson').length
  const quizzesCount = contents.filter(c => c.content_type === 'quiz').length

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
                <h1 className="text-2xl font-bold text-white">Admin Paneli</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-sm font-medium rounded-full">
                  <Shield className="w-4 h-4 mr-1" />
                  Yönetici
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
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/login')
                }}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Admin Paneli 🛡️
          </h2>
          <p className="text-xl text-gray-300">
            Platform içeriklerini ve kullanıcıları yönet
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Toplam İçerik</p>
                  <p className="text-2xl font-bold text-white">{totalContents}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Dersler</p>
                  <p className="text-2xl font-bold text-white">{lessonsCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Quizler</p>
                  <p className="text-2xl font-bold text-white">{quizzesCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
                  <Users2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Kullanıcılar</p>
                  <p className="text-2xl font-bold text-white">{totalUsers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className="mb-8 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-300">{status}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contents */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Son İçerikler</h3>
                <p className="text-gray-300">Platformdaki son eklenen içerikler</p>
              </div>
            </div>

            {contents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-300 mb-2">Henüz içerik yok</p>
                <p className="text-gray-400 text-sm">Yeni içerikler eklendiğinde burada görünecek</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contents.map((content) => (
                  <div key={content.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          content.content_type === 'lesson' 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-r from-purple-400 to-indigo-500'
                        }`}>
                          {content.content_type === 'lesson' ? (
                            <BookOpen className="w-5 h-5 text-white" />
                          ) : (
                            <Target className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{content.title}</h4>
                          <p className="text-gray-300 text-sm">{content.subject} • {content.grade}. Sınıf</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          content.content_type === 'lesson' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {content.content_type === 'lesson' ? 'Ders' : 'Quiz'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Users */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Users2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Son Kullanıcılar</h3>
                <p className="text-gray-300">Platforma son katılan kullanıcılar</p>
              </div>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-300 mb-2">Henüz kullanıcı yok</p>
                <p className="text-gray-400 text-sm">Yeni kullanıcılar kaydolduğunda burada görünecek</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-violet-500 rounded-xl flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{user.email}</h4>
                          <p className="text-gray-300 text-sm capitalize">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                          Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">İçerik Yönetimi</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Ders ve quiz içeriklerini yönet</p>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
              İçerikleri Görüntüle
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Kullanıcı Yönetimi</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Öğrenci ve öğretmen hesaplarını yönet</p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
              Kullanıcıları Görüntüle
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Platform Analizi</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Platform istatistiklerini görüntüle</p>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
              Analizi Görüntüle
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Sistem Durumu</h3>
              <p className="text-gray-300">Platform performansı ve durumu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Veritabanı</p>
                  <p className="text-green-400 text-sm">Aktif</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">API</p>
                  <p className="text-green-400 text-sm">Çalışıyor</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Auth</p>
                  <p className="text-green-400 text-sm">Aktif</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Storage</p>
                  <p className="text-green-400 text-sm">Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
