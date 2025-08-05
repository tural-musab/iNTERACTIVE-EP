'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserProfile } from '@/types/user'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell
} from 'lucide-react'

interface ParentData {
  id: string
}

interface PendingInvite {
  id: string
  student_id: string
  status: string
  student?: {
    id: string
    full_name: string
    grade: number
  }
}

export default function ParentDashboard() {
  const [children, setChildren] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [parent, setParent] = useState<ParentData | null>(null)
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchChildren() {
      // 1. Auth üzerinden oturum açan kullanıcının email adresini al
      const { data: userData } = await supabase.auth.getUser()
      const email = userData?.user?.email

      // 2. user_profiles tablosunda parent id'yi bul
      const { data: parentData } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', email)
        .eq('role', 'parent')
        .maybeSingle()

      if (!parentData) {
        setLoading(false)
        return
      }
      setParent(parentData)

      // 3. parent_student_links üzerinden ilişkili student_id'leri bul
      const { data: links } = await supabase
        .from('parent_student_links')
        .select('student_id')
        .eq('parent_id', parentData.id)
        .eq('status', 'confirmed')

      if (!links || links.length === 0) {
        setLoading(false)
        return
      }

      const studentIds = links.map(link => link.student_id)

      // 4. user_profiles tablosundan çocukların profilini çek
      const { data: students } = await supabase
        .from('user_profiles')
        .select('id, full_name, grade, email')
        .eq('role', 'student')
        .in('id', studentIds)

      setChildren(students || [])
      
      // 5. pending (onay bekleyen) davetleri de çek
      const { data: pending } = await supabase
        .from('parent_student_links')
        .select('id, student_id, status')
        .eq('parent_id', parentData.id)
        .eq('status', 'pending')

      if (pending && pending.length > 0) {
        // öğrencilerin isimlerini de çekmek için join-like bir sorgu:
        const studentIds = pending.map(link => link.student_id)
        const { data: pendingStudents } = await supabase
          .from('user_profiles')
          .select('id, full_name, grade')
          .eq('role', 'student')
          .in('id', studentIds)
        // id eşleştirip gösterim için birleştir
        const invites = pending.map(inv => ({
          ...inv,
          student: pendingStudents?.find(s => s.id === inv.student_id)
        }))
        setPendingInvites(invites)
      }
      
      setLoading(false)
    }

    fetchChildren()
  }, [])

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
                <h1 className="text-2xl font-bold text-white">Veli Paneli</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-full">
                  <Users className="w-4 h-4 mr-1" />
                  Çocuk Takibi
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
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Hoş Geldiniz!
          </h2>
          <p className="text-xl text-gray-300">
            {parent ? `Çocuklarınızın eğitim yolculuğunu takip edin` : 'Veli bilgisi bulunamadı.'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-pink-400 to-violet-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Toplam Çocuk</p>
                  <p className="text-2xl font-bold text-white">{children.length}</p>
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
                  <p className="text-sm font-medium text-gray-300">Tamamlanan Ders</p>
                  <p className="text-2xl font-bold text-white">24</p>
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
                  <p className="text-sm font-medium text-gray-300">Quiz Sayısı</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Ortalama Başarı</p>
                  <p className="text-2xl font-bold text-white">87%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Children Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Children List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Çocuklarım</h3>
                <p className="text-gray-300">Eğitim durumlarını takip edin</p>
              </div>
            </div>

            {children.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-300 mb-4">Henüz tanımlı bir çocuk yok.</p>
                <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                  Çocuk Ekle
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {children.map(child => (
                  <div key={child.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {child.full_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{child.full_name}</h4>
                          <p className="text-gray-300">{child.grade}. Sınıf</p>
                          <p className="text-gray-400 text-sm">{child.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-semibold">85%</span>
                        </div>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Invites */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Bekleyen Davetler</h3>
                <p className="text-gray-300">Çocuk davetlerini onaylayın</p>
              </div>
            </div>

            {pendingInvites.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-gray-300">Bekleyen davet bulunmuyor.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingInvites.map(invite => (
                  <div key={invite.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {invite.student?.full_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{invite.student?.full_name}</h4>
                          <p className="text-gray-300">{invite.student?.grade}. Sınıf</p>
                          <p className="text-orange-300 text-sm">Davet bekliyor</p>
                        </div>
                      </div>
                      <button
                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-2xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        onClick={async () => {
                          await supabase
                            .from('parent_student_links')
                            .update({ status: 'confirmed' })
                            .eq('id', invite.id)
                          window.location.reload()
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Kabul Et</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Son Aktiviteler</h3>
              <p className="text-gray-300">Çocuklarınızın son çalışmaları</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Matematik Dersi</h4>
                  <p className="text-gray-300 text-sm">2 saat önce</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Ahmet Y.</span>
                <span className="text-green-400 font-semibold">%92 Başarı</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Quiz Tamamlandı</h4>
                  <p className="text-gray-300 text-sm">1 gün önce</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Zeynep K.</span>
                <span className="text-purple-400 font-semibold">15/20 Puan</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">İlerleme Raporu</h4>
                  <p className="text-gray-300 text-sm">3 gün önce</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Mehmet A.</span>
                <span className="text-orange-400 font-semibold">%15 Artış</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
