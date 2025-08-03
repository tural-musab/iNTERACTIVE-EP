'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { ContentForm } from '@/components/content-form'
import { ContentDetailModal } from '@/components/content-detail-modal'
import { createClient } from '@/lib/supabase/client'
import { 
  BookOpen, Brain, Trophy, Users, Star, ChevronRight, Menu, X, 
  Play, Target, Zap, Award, BarChart3, Clock, CheckCircle2,
  Calculator, Sparkles, Rocket, Heart, TrendingUp, Shield,
  User, GraduationCap, UserCheck, Plus, Edit, Trash2, Eye
} from 'lucide-react'

interface ContentData {
  description?: string
  sections?: Array<{
    title: string
    content: string
    examples?: string[]
  }>
  instructions?: string
  time_limit?: number
  questions?: Array<{
    id: number
    question: string
    type: string
    options?: string[]
    correct: number | boolean
    points: number
  }>
  passing_score?: number
}

interface Content {
  id: string
  title: string
  subject: string
  grade: number
  topic: string
  content_type: 'lesson' | 'quiz'
  content_data: ContentData
  created_at: string
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showContentForm, setShowContentForm] = useState(false)
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // selectedContent will be used for editing content in future
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedContentForDetail, setSelectedContentForDetail] = useState<Content | null>(null)

  const supabase = createClient()

  const loadContents = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContents((data as unknown as Content[]) || [])
    } catch (err) {
      setError('İçerikler yüklenirken hata oluştu')
      console.error('Error loading contents:', err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const handleContentSuccess = () => {
    loadContents()
    setShowContentForm(false)
  }

  const handleEditContent = (content: Content) => {
    setSelectedContentForDetail(content)
    setDetailModalOpen(true)
  }

  const handleDeleteContent = async (contentId: string) => {
    if (!confirm('Bu içeriği silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', contentId)

      if (error) throw error
      await loadContents()
    } catch (err) {
      setError('İçerik silinirken hata oluştu')
      console.error('Error deleting content:', err)
    }
  }

  const handleViewDetails = (content: Content) => {
    setSelectedContentForDetail(content)
    setDetailModalOpen(true)
  }

  const handleContentUpdate = async (updatedContent: Content) => {
    try {
      const { error } = await supabase
        .from('content')
        .update({ content_data: updatedContent.content_data })
        .eq('id', updatedContent.id)

      if (error) throw error
      
      // Ana listeyi güncelle
      setContents(prev => prev.map(c => 
        c.id === updatedContent.id ? updatedContent : c
      ))
      
      // Detail modal'daki content'i güncelle
      setSelectedContentForDetail(updatedContent)
      
      alert('İçerik başarıyla güncellendi!')
    } catch (err) {
      alert('Güncelleme sırasında hata oluştu!')
      console.error('Error updating content:', err)
    }
  }

  useEffect(() => {
    loadContents()
  }, [loadContents])

  // Mock data for stats
  const stats = {
    totalStudents: contents.length > 0 ? 24 : 0,
    totalLessons: contents.filter(c => c.content_type === 'lesson').length,
    totalQuizzes: contents.filter(c => c.content_type === 'quiz').length,
    averageScore: contents.length > 0 ? 78.5 : 0
  }

  // Mock data for recent activities
  const recentActivities = contents.slice(0, 3).map((content) => ({
    id: content.id,
    title: content.title,
    type: content.content_type,
    students: 24,
    date: new Date(content.created_at).toLocaleDateString('tr-TR'),
    content: content // Store the full content object for reference
  }))

  // Mock data for top students
  const topStudents = [
    { name: 'Ahmet Yılmaz', grade: '5A', score: 95 },
    { name: 'Ayşe Demir', grade: '5B', score: 92 },
    { name: 'Mehmet Kaya', grade: '5A', score: 88 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-white">Öğretmen Paneli</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Matematik Öğretmeni
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Genel Bakış', icon: BarChart3 },
              { id: 'content', name: 'İçerik Yönetimi', icon: BookOpen },
              { id: 'students', name: 'Öğrenci Takibi', icon: Users },
              { id: 'quizzes', name: 'Quiz Analizi', icon: Target },
              { id: 'reports', name: 'Raporlar', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center backdrop-blur-lg ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-yellow-300 border border-yellow-400/30 shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-r from-pink-400 to-violet-500 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Toplam Öğrenci</p>
                      <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
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
                      <p className="text-sm font-medium text-gray-300">Toplam Ders</p>
                      <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
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
                      <p className="text-sm font-medium text-gray-300">Toplam Quiz</p>
                      <p className="text-2xl font-bold text-white">{stats.totalQuizzes}</p>
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
                      <p className="text-sm font-medium text-gray-300">Ortalama Puan</p>
                      <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities & Top Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Son Aktiviteler</h3>
                <div className="space-y-3">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center">
                          <div className="p-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg mr-3">
                            {activity.type === 'quiz' ? (
                              <Target className="w-5 h-5 text-white" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{activity.title}</p>
                            <p className="text-sm text-gray-300">
                              {activity.students} öğrenci • {activity.date}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleViewDetails(activity.content)}
                          className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-300 text-center py-4">
                      Henüz içerik eklenmemiş
                    </p>
                  )}
                </div>
              </div>

              {/* Top Students */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">En Başarılı Öğrenciler</h3>
                <div className="space-y-3">
                  {topStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">{student.name}</p>
                          <p className="text-sm text-gray-300">{student.grade}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <p className="font-bold text-green-400">{student.score}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Hızlı İşlemler</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setShowContentForm(true)}
                  className="group relative p-6 bg-white/5 rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-medium text-white mb-2">Yeni Ders Ekle</p>
                    <p className="text-sm text-gray-300">Matematik konusu ekle</p>
                  </div>
                </button>
                <button 
                  onClick={() => setShowContentForm(true)}
                  className="group relative p-6 bg-white/5 rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-medium text-white mb-2">Quiz Oluştur</p>
                    <p className="text-sm text-gray-300">Soru bankasından seç</p>
                  </div>
                </button>
                <button className="group relative p-6 bg-white/5 rounded-2xl border border-white/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-medium text-white mb-2">Rapor Oluştur</p>
                    <p className="text-sm text-gray-300">Sınıf performansı</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">İçerik Yönetimi</h2>
              <button 
                onClick={() => setShowContentForm(true)}
                className="bg-gradient-to-r from-pink-500 to-violet-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Yeni İçerik Ekle
              </button>
            </div>

            {/* Content List */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-300">Yükleniyor...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500/50 rounded-md p-4">
                <p className="text-red-300">{error}</p>
              </div>
            ) : contents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contents.map((content) => (
                  <div key={content.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          content.content_type === 'lesson' 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                            : 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white'
                        }`}>
                          {content.content_type === 'lesson' ? 'Ders' : 'Quiz'}
                        </span>
                        <span className="text-sm text-gray-300">
                          {content.grade}. Sınıf
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">
                        {content.topic}
                      </p>
                      {content.content_data?.description && (
                        <p className="text-sm text-gray-400 mb-4">
                          {content.content_data.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {new Date(content.created_at).toLocaleDateString('tr-TR')}
                        </span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditContent(content)}
                            className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 text-sm flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            Düzenle
                          </button>
                          <button 
                            onClick={() => handleDeleteContent(content.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-300 mb-4">Henüz içerik eklenmemiş</p>
                <button 
                  onClick={() => setShowContentForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-violet-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  İlk İçeriğinizi Ekleyin
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Öğrenci Takibi</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Öğrencilerinizin ilerleme durumlarını ve performanslarını takip edebilirsiniz.
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-sm font-medium rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  MVP: Yakında eklenecek
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Quiz Analizi</h2>
              
              {contents.filter(c => c.content_type === 'quiz').length > 0 ? (
                <div className="space-y-6">
                  {contents.filter(c => c.content_type === 'quiz').map((quiz) => (
                    <div key={quiz.id} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                            <p className="text-gray-300">{quiz.topic}</p>
                          </div>
                          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Quiz
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl font-bold text-white">
                                {quiz.content_data?.questions?.length || 0}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">Soru Sayısı</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl font-bold text-white">
                                {quiz.content_data?.time_limit || 0}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">Dakika</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl font-bold text-white">
                                {quiz.content_data?.passing_score || 0}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">Geçme Notu</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                            Sonuçları Gör
                          </button>
                          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                            Öğrencilere Aç
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-300 mb-4">
                    Henüz quiz oluşturulmamış. Quiz oluşturmak için &quot;İçerik Yönetimi&quot; sekmesine gidin.
                  </p>
                  <button 
                    onClick={() => setActiveTab('content')}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    İçerik Yönetimine Git
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Raporlar</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Detaylı raporlar oluşturabilir ve sınıf performansını analiz edebilirsiniz.
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-sm font-medium rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  MVP: Yakında eklenecek
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Form Modal */}
      {showContentForm && (
        <ContentForm
          onSuccess={handleContentSuccess}
          onCancel={() => {
            setShowContentForm(false)
            setSelectedContent(null)
          }}
        />
      )}

      {/* Content Detail Modal */}
      <ContentDetailModal
        content={selectedContentForDetail}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedContentForDetail(null)
        }}
        onContentUpdate={handleContentUpdate}
      />
    </div>
  )
}