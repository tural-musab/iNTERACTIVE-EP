'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell, Edit, User,
  Mail, Plus, Trophy, Zap, Brain, Calculator, Play,
  Shield, Crown, Settings, Activity, Eye, CheckCircle,
  XCircle, AlertCircle, Send
} from 'lucide-react'

interface Teacher {
  id: string
  full_name: string
  email: string
  is_approved: boolean
}

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const router = useRouter()

  // 1. Onay bekleyen öğretmenleri çek
  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true)
      const { data, error } = await supabase
        .from('teachers')
        .select('id, full_name, email, is_approved')
        .order('created_at', { ascending: false })

      if (error) {
        setStatus('Listeleme hatası: ' + error.message)
      } else if (data) {
        setTeachers(data)
      }
      setLoading(false)
    }
    fetchTeachers()
  }, [])

  // 2. Onayla ve davet gönder butonu
  async function handleApproveAndInvite(teacher: Teacher) {
    setStatus('Onaylanıyor ve davet gönderiliyor...')
    
    // Önce onayla
    const { error: approveError } = await supabase
      .from('teachers')
      .update({ is_approved: true })
      .eq('id', teacher.id)

    if (approveError) {
      setStatus('Onay hatası: ' + approveError.message)
      return
    }

    // Sonra davet gönder
    try {
      const response = await fetch('/api/invite-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: teacher.email })
      })

      if (response.ok) {
        setStatus('Onaylandı ve davet maili gönderildi!')
        setTeachers(prev =>
          prev.map(t =>
            t.id === teacher.id ? { ...t, is_approved: true } : t
          )
        )
      } else {
        setStatus('Onaylandı fakat davet maili gönderilemedi.')
        setTeachers(prev =>
          prev.map(t =>
            t.id === teacher.id ? { ...t, is_approved: true } : t
          )
        )
      }
    } catch (error) {
      setStatus('Onaylandı fakat davet maili gönderilemedi.')
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacher.id ? { ...t, is_approved: true } : t
        )
      )
    }
  }

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
  const totalTeachers = teachers.length
  const approvedTeachers = teachers.filter(t => t.is_approved).length
  const pendingTeachers = teachers.filter(t => !t.is_approved).length

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
                <h1 className="text-2xl font-bold text-white">Super Admin Paneli</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-sm font-medium rounded-full">
                  <Crown className="w-4 h-4 mr-1" />
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
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Super Admin Paneli 👑
          </h2>
          <p className="text-xl text-gray-300">
            Öğretmen başvurularını yönet ve platformu kontrol et
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Toplam Öğretmen</p>
                  <p className="text-2xl font-bold text-white">{totalTeachers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Onaylanan</p>
                  <p className="text-2xl font-bold text-white">{approvedTeachers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Bekleyen</p>
                  <p className="text-2xl font-bold text-white">{pendingTeachers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Aktif Platform</p>
                  <p className="text-2xl font-bold text-white">100%</p>
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

        {/* Teachers Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Öğretmen Başvuruları</h3>
              <p className="text-gray-300">Başvuruları incele ve onayla</p>
            </div>
          </div>

          {teachers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-300 mb-2">Henüz öğretmen başvurusu yok</p>
              <p className="text-gray-400 text-sm">Yeni başvurular geldiğinde burada görünecek</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {teacher.full_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{teacher.full_name}</h4>
                        <p className="text-gray-300">{teacher.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        {teacher.is_approved ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-semibold">Onaylandı</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-semibold">Bekliyor</span>
                          </div>
                        )}
                      </div>
                      
                      {!teacher.is_approved && (
                        <button
                          className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                          onClick={() => handleApproveAndInvite(teacher)}
                        >
                          <Send className="w-5 h-5" />
                          <span>Onayla ve Davet Gönder</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Platform Ayarları</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Sistem ayarlarını yönet</p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
              Ayarları Aç
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Analitik Raporu</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Platform istatistiklerini gör</p>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
              Raporu Görüntüle
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Güvenlik</h4>
            </div>
            <p className="text-gray-300 text-sm mb-4">Güvenlik ayarlarını kontrol et</p>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
              Güvenlik Paneli
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
