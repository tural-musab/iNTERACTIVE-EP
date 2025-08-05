'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'
import { GamificationDashboard } from '@/components/gamification/GamificationDashboard'
import { useGamificationStore } from '@/stores/gamificationStore'
import { AnalyticsSummary } from '@/components/dashboard/AnalyticsSummary'
import { DashboardLayout, DashboardHeader } from '@/components/dashboard/DashboardLayout'
import { UserProfile } from '@/types/user'
import { 
  Sparkles, Users, GraduationCap, Clock, Award, CheckCircle2,
  UserPlus, ArrowLeft, LogOut, BookOpen, Target, BarChart3,
  TrendingUp, Heart, Star, Calendar, Bell, Edit, User,
  Mail, Plus, Trophy, Zap, Brain, Calculator, Play, Activity, Lightbulb
} from 'lucide-react'
import { motion } from 'framer-motion'
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileContainer, MobileGrid, MobileCard, MobileButton, MobileText, MobileSpacing } from '@/components/mobile/MobileOptimizations';
import { TouchGestures, SwipeableCard } from '@/components/mobile/TouchGestures';
import { PerformanceMonitor, OptimizedImage } from '@/components/mobile/PerformanceOptimizer';
import { MobileTestSuite } from '@/components/mobile/MobileTestSuite';
import { MobilePerformanceDashboard } from '@/components/mobile/MobilePerformanceDashboard';

// --- 2. Veli davet formu (alt bileşen) ---
function InviteParentForm({ studentId }: { studentId: string }) {
  const [parentEmail, setParentEmail] = useState('')
  const [inviteStatus, setInviteStatus] = useState('')

  async function handleInviteParent() {
    setInviteStatus('Gönderiliyor...')

    // 1. Veli zaten kayıtlı mı kontrol et
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', parentEmail)
      .eq('role', 'parent')
      .maybeSingle()

    if (existing) {
      setInviteStatus('Bu e-posta zaten veli olarak kayıtlı.')
      return
    }

    // 2. parent_student_links tablosuna davet ekle
    const { error } = await supabase
      .from('parent_student_links')
      .insert([
        {
          parent_id: null,
          student_id: studentId,
          invited_email: parentEmail,
          status: 'pending',
        }
      ])
    if (error) {
      setInviteStatus('Hata: ' + error.message)
      return
    }

    setInviteStatus('Davet kaydı oluşturuldu! Velin kaydolunca eşleşecek.')
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Velini Davet Et</h2>
          <p className="text-gray-300 text-sm">Velinin e-posta adresini gir</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
            type="email"
            placeholder="Veli e-posta adresi"
            value={parentEmail}
            onChange={e => setParentEmail(e.target.value)}
          />
        </div>
        
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          onClick={handleInviteParent}
        >
          <Mail className="w-5 h-5" />
          <span>Davet Gönder</span>
        </button>
        
        {inviteStatus && (
          <div className="mt-4 p-3 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-center text-sm text-gray-300">{inviteStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// --- 3. Student Dashboard Ana Bileşen ---
export default function StudentDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState('')
  const [newGrade, setNewGrade] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()
  
  // Gamification store'u kullan
  const { 
    initialize, 
    isLoading: gamificationLoading,
    error: gamificationError,
    clearError,
    totalXP,
    level,
    currentStreak,
    earnedBadgeIds,
    userStats
  } = useGamificationStore();

  // Profil bilgilerini çek ve gamification'ı başlat
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: userData, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Auth error:', authError)
          router.push('/login')
          return
        }
        
        if (!userData?.user) {
          router.push('/login')
          return
        }
        
        const { data: student, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userData.user.id)
          .eq('role', 'student')
          .single()
          
        if (error) {
          console.error('Student profile error:', error)
          setStatus('Profil yüklenirken hata oluştu: ' + error.message)
        } else if (student) {
          setProfile(student as unknown as UserProfile)
          // Gamification'ı başlat
          try {
            await initialize(userData.user.id)
          } catch (gamificationError) {
            console.error('Gamification initialization error:', gamificationError)
            setStatus('Gamification başlatılırken hata oluştu')
          }
        }
      } catch (error) {
        console.error('Profile fetch error:', error)
        setStatus('Beklenmeyen bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [router, initialize])

  // Profil güncelle
  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Kaydediliyor...')
    if (!profile) return

    const { error } = await supabase
      .from('user_profiles')
      .update({
        full_name: newName,
        grade: Number(newGrade),
      })
      .eq('id', profile.id)

    if (error) {
      setStatus('Güncelleme hatası: ' + error.message)
    } else {
      setStatus('Profil başarıyla güncellendi!')
      setProfile({
        ...profile,
        full_name: newName,
        grade: Number(newGrade),
      })
      setEditMode(false)
    }
  }

  // 1. Yükleniyor ekranı
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

  // 2. Profil bulunamadı ekranı
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Profil bulunamadı</h1>
          <p className="text-gray-300 mb-4">Profil bilgilerin çekilemedi.</p>
          {status && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-200 text-sm">{status}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  // 3. Profil düzenleme ekranı
  if (editMode) {
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
                  <h1 className="text-2xl font-bold text-white">Profil Düzenle</h1>
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-sm font-medium rounded-full">
                    <Edit className="w-4 h-4 mr-1" />
                    Düzenleme Modu
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Geri Dön</span>
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Edit className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Profili Düzenle</h2>
              <p className="text-gray-300">Bilgilerini güncelle</p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ad Soyad"
                  required
                />
              </div>
              
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  type="number"
                  min={5}
                  max={11}
                  value={newGrade}
                  onChange={e => setNewGrade(e.target.value)}
                  placeholder="Sınıf (5-11)"
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" 
                  type="submit"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kaydet</span>
                </button>
                <button
                  type="button"
                  className="flex-1 bg-white/10 text-white px-6 py-3 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setEditMode(false)}
                >
                  Vazgeç
                </button>
              </div>
              
              {status && (
                <div className="mt-4 p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-center text-sm text-gray-300">{status}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }

  // 4. Ana dashboard ekranı
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Öğrenci Paneli"
        icon={Sparkles}
        badge={{ text: `${profile.grade}. Sınıf`, icon: GraduationCap }}
        onBack={() => router.push('/')}
        onLogout={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <MobileContainer>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Error Display */}
            {(status || gamificationError) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 backdrop-blur-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">⚠️</span>
                      </div>
                      <div>
                        <p className="text-red-200 font-medium">Hata Oluştu</p>
                        <p className="text-red-300 text-sm">
                          {status || gamificationError}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStatus('');
                        clearError();
                      }}
                      className="text-red-300 hover:text-red-200 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Welcome Section - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <MobileCard className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                <div className="relative z-10">
                  <MobileText variant="h2" className="text-white mb-2">
                    Hoş geldin, {profile?.full_name || 'Öğrenci'}! 👋
                  </MobileText>
                  <MobileText variant="body" className="text-gray-300">
                    Bugün öğrenmeye devam edelim. Hangi konuyu çalışmak istiyorsun?
                  </MobileText>
                </div>
              </MobileCard>
            </motion.div>

            {/* Stats Cards - Mobile Optimized Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <MobileGrid cols={{ mobile: 2, tablet: 2, desktop: 4 }} gap={{ mobile: 3, tablet: 4, desktop: 6 }}>
                <TouchGestures onTap={() => router.push('/analytics')}>
                  <MobileCard className="text-center cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <MobileText variant="h4" className="text-white mb-1">
                      {userStats?.totalQuizzesCompleted || 0}
                    </MobileText>
                    <MobileText variant="caption">Toplam Quiz</MobileText>
                  </MobileCard>
                </TouchGestures>

                <TouchGestures onTap={() => router.push('/analytics')}>
                  <MobileCard className="text-center cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <MobileText variant="h4" className="text-white mb-1">
                      {userStats?.averageAccuracy ? Math.round(userStats.averageAccuracy) : 0}%
                    </MobileText>
                    <MobileText variant="caption">Başarı Oranı</MobileText>
                  </MobileCard>
                </TouchGestures>

                <TouchGestures onTap={() => router.push('/analytics')}>
                  <MobileCard className="text-center cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <MobileText variant="h4" className="text-white mb-1">
                      {userStats?.totalTimeSpent ? Math.round(userStats.totalTimeSpent / 60) : 0} dk
                    </MobileText>
                    <MobileText variant="caption">Çalışma Süresi</MobileText>
                  </MobileCard>
                </TouchGestures>

                <TouchGestures onTap={() => router.push('/analytics')}>
                  <MobileCard className="text-center cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <MobileText variant="h4" className="text-white mb-1">
                      {earnedBadgeIds?.length || 0}
                    </MobileText>
                    <MobileText variant="caption">Kazanılan Rozet</MobileText>
                  </MobileCard>
                </TouchGestures>
              </MobileGrid>
            </motion.div>

            {/* Quick Actions - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <MobileText variant="h3" className="text-white mb-4">Hızlı İşlemler</MobileText>
              <MobileGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={{ mobile: 3, tablet: 4, desktop: 6 }}>
                <SwipeableCard onSwipeRight={() => router.push('/lessons')}>
                  <MobileCard className="cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <MobileText variant="h4" className="text-white mb-1">Dersler</MobileText>
                        <MobileText variant="caption">Yeni konuları keşfet</MobileText>
                      </div>
                    </div>
                  </MobileCard>
                </SwipeableCard>

                <SwipeableCard onSwipeRight={() => router.push('/quiz')}>
                  <MobileCard className="cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <MobileText variant="h4" className="text-white mb-1">Quiz</MobileText>
                        <MobileText variant="caption">Bilgini test et</MobileText>
                      </div>
                    </div>
                  </MobileCard>
                </SwipeableCard>

                <SwipeableCard onSwipeRight={() => router.push('/analytics')}>
                  <MobileCard className="cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <MobileText variant="h4" className="text-white mb-1">Analytics</MobileText>
                        <MobileText variant="caption">İlerlemeni takip et</MobileText>
                      </div>
                    </div>
                  </MobileCard>
                </SwipeableCard>
              </MobileGrid>
            </motion.div>

            {/* Gamification Dashboard - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 md:hidden"
            >
              <MobileCard>
                <GamificationDashboard />
              </MobileCard>
            </motion.div>

            {/* Analytics Quick Overview - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 md:hidden"
            >
              <AnalyticsSummary 
                userStats={userStats} 
                currentStreak={currentStreak} 
                isMobile={true} 
              />
            </motion.div>

            {/* Parent Invite Form - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="md:hidden"
            >
              <InviteParentForm studentId={profile.id} />
            </motion.div>
          </div>
        </MobileContainer>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Recent Activity */}
      <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Son Aktiviteler</h3>
            <p className="text-gray-300">Son çalışmaların</p>
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
              <span className="text-gray-300 text-sm">Kesirler</span>
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
              <span className="text-gray-300 text-sm">Geometri</span>
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
              <span className="text-gray-300 text-sm">Genel</span>
              <span className="text-orange-400 font-semibold">%15 Artış</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Dashboard - Desktop Only */}
      <div className="mt-12 hidden md:block">
        <GamificationDashboard />
      </div>

      {/* Analytics Quick Overview - Desktop Only */}
      <div className="mt-8 hidden md:block">
        <AnalyticsSummary 
          userStats={userStats} 
          currentStreak={currentStreak} 
          isMobile={false} 
        />
      </div>

      {/* Parent Invite Form - Desktop Only */}
      <div className="mt-8 hidden md:block">
        <InviteParentForm studentId={profile.id} />
      </div>

      {/* Mobile Performance & Test Section */}
      <div className="mt-8">
        <MobileContainer>
          <MobileGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={{ mobile: 4, tablet: 6, desktop: 8 }}>
            {/* Mobile Performance Dashboard */}
            <MobileCard>
              <MobilePerformanceDashboard />
            </MobileCard>

            {/* Mobile Test Suite */}
            <MobileCard>
              <MobileTestSuite 
                onComplete={(results) => {
                  console.log('Mobile test results:', results);
                }}
              />
            </MobileCard>
          </MobileGrid>
        </MobileContainer>
      </div>

      {/* Touch Gesture Demo */}
      <div className="mt-8">
        <MobileContainer>
          <MobileCard>
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold text-lg">Dokunma Hareketleri Demo</h3>
              <p className="text-gray-300 text-sm">Mobil cihazlarda dokunma hareketlerini test edin</p>
            </div>
            
            <TouchGestures
              onSwipeLeft={() => {
                // Navigate to previous lesson
                console.log('Swipe left - Previous lesson');
              }}
              onSwipeRight={() => {
                // Navigate to next lesson
                console.log('Swipe right - Next lesson');
              }}
              onTap={() => {
                // Quick action
                console.log('Tap - Quick action');
              }}
              onDoubleTap={() => {
                // Bookmark or favorite
                console.log('Double tap - Bookmark');
              }}
            >
              <SwipeableCard
                onSwipeLeft={() => console.log('Card swiped left')}
                onSwipeRight={() => console.log('Card swiped right')}
                className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Ders Kartı</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Bu kartı farklı yönlere kaydırarak test edebilirsiniz
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-400">
                    <span>← Sola kaydır</span>
                    <span>Sağa kaydır →</span>
                  </div>
                </div>
              </SwipeableCard>
            </TouchGestures>
          </MobileCard>
        </MobileContainer>
      </div>
    </DashboardLayout>
  )
}
