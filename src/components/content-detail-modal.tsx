'use client'

import { useState } from 'react'
import { MathRenderer, formatMathText } from './math-renderer'
import { 
  X, Edit, Trash2, BookOpen, Target, Calculator, Users, 
  Clock, Award, CheckCircle2, Eye, Settings, BarChart3
} from 'lucide-react'

interface Question {
  id: number
  question: string
  type: string
  options?: string[]
  correct: number | boolean
  points: number
  explanation?: string
}

interface ContentData {
  description?: string
  sections?: Array<{
    title: string
    content: string
    examples?: string[]
  }>
  instructions?: string
  time_limit?: number
  questions?: Question[]
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

interface ContentDetailModalProps {
  content: Content | null
  isOpen: boolean
  onClose: () => void
}

export function ContentDetailModal({ content, isOpen, onClose, onContentUpdate }: ContentDetailModalProps & { onContentUpdate?: (c: Content) => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'settings'>('overview')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [saving, setSaving] = useState(false)

  if (!isOpen || !content) return null

  const isQuiz = content.content_type === 'quiz'
  const questions = content.content_data?.questions || []

  // Kaydet fonksiyonu
  async function handleSaveEdit() {
    if (!editingContent) return;
    setSaving(true)
    try {
      if (onContentUpdate) {
        await onContentUpdate(editingContent)
        setIsEditModalOpen(false)
      }
    } catch (e) {
      console.error('Save error:', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isQuiz 
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white'
                    : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                }`}>
                  {isQuiz ? 'Quiz' : 'Ders'}
                </span>
                <h2 className="text-xl font-semibold text-white">
                  {content.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-yellow-300 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/20">
              {[
                { id: 'overview', name: 'Genel Bakış', icon: Eye },
                { id: 'questions', name: 'Sorular', icon: Target },
                { id: 'settings', name: 'Ayarlar', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-yellow-300 border-b-2 border-yellow-300 bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">Konu</span>
                      </div>
                      <p className="text-gray-300">{content.topic}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calculator className="w-5 h-5 text-pink-400" />
                        <span className="text-white font-medium">Sınıf</span>
                      </div>
                      <p className="text-gray-300">{content.grade}. Sınıf</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Oluşturulma</span>
                      </div>
                      <p className="text-gray-300">{new Date(content.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {content.content_data?.description && (
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h3 className="text-white font-semibold mb-2">Açıklama</h3>
                      <p className="text-gray-300">{content.content_data.description}</p>
                    </div>
                  )}

                  {/* Quiz Info */}
                  {isQuiz && content.content_data && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          <span className="text-white font-medium">Soru Sayısı</span>
                        </div>
                        <p className="text-gray-300">{questions.length}</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-orange-400" />
                          <span className="text-white font-medium">Süre</span>
                        </div>
                        <p className="text-gray-300">{content.content_data.time_limit || 15} dakika</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-yellow-400" />
                          <span className="text-white font-medium">Geçme Puanı</span>
                        </div>
                        <p className="text-gray-300">%{content.content_data.passing_score || 60}</p>
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  {isQuiz && content.content_data?.instructions && (
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h3 className="text-white font-semibold mb-2">Talimatlar</h3>
                      <p className="text-gray-300">{content.content_data.instructions}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => {
                        setEditingContent(JSON.parse(JSON.stringify(content)))
                        setIsEditModalOpen(true)
                      }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Düzenle</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'questions' && isQuiz && (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={index} className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold">Soru {index + 1}</span>
                        <span className="text-gray-300">{question.points} puan</span>
                      </div>
                      
                      <div className="mb-4">
                        <MathRenderer text={question.question} />
                      </div>

                      {question.options && (
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-xl ${
                                optionIndex === question.correct
                                  ? 'bg-green-500/20 border border-green-500/50'
                                  : 'bg-white/10 border border-white/20'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                  optionIndex === question.correct
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white/20 text-gray-300'
                                }`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                <MathRenderer text={option} />
                                {optionIndex === question.correct && (
                                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.explanation && (
                        <div className="bg-white/10 rounded-xl p-3">
                          <span className="text-yellow-300 font-medium text-sm">Açıklama:</span>
                          <div className="text-gray-300 text-sm mt-1">
                            <MathRenderer text={question.explanation} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">İçerik Ayarları</h3>
                    <p className="text-gray-300 mb-6">Bu bölümde içerik ayarları yapılabilir.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-medium mb-2">Temel Bilgiler</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p><span className="text-yellow-300">Başlık:</span> {content.title}</p>
                          <p><span className="text-yellow-300">Konu:</span> {content.topic}</p>
                          <p><span className="text-yellow-300">Sınıf:</span> {content.grade}. Sınıf</p>
                          <p><span className="text-yellow-300">Tür:</span> {content.content_type === 'quiz' ? 'Quiz' : 'Ders'}</p>
                        </div>
                      </div>
                      
                      {isQuiz && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-white font-medium mb-2">Quiz Ayarları</h4>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p><span className="text-yellow-300">Soru Sayısı:</span> {content.content_data?.questions?.length || 0}</p>
                            <p><span className="text-yellow-300">Süre:</span> {content.content_data?.time_limit || 0} dakika</p>
                            <p><span className="text-yellow-300">Geçme Puanı:</span> {content.content_data?.passing_score || 0}%</p>
                            <p><span className="text-yellow-300">Oluşturulma:</span> {new Date(content.created_at).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setEditingContent(JSON.parse(JSON.stringify(content)))
                          setIsEditModalOpen(true)
                        }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          if (confirm('Bu içeriği silmek istediğinizden emin misiniz?')) {
                            // Silme işlemi burada yapılacak
                            console.log('Silme işlemi:', content.id)
                          }
                        }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-red-400 to-orange-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Sil</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          // Kopyalama işlemi burada yapılacak
                          console.log('Kopyalama işlemi:', content.id)
                        }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Kopyala</span>
                      </button>
                      
                      {isQuiz && (
                        <button
                          onClick={() => {
                            // Quiz'i öğrencilere açma işlemi
                            console.log('Quiz açma işlemi:', content.id)
                          }}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                          <Target className="w-4 h-4" />
                          <span>Öğrencilere Aç</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">İçeriği Düzenle</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white hover:text-yellow-300 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Başlık</label>
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent(prev => prev ? { ...prev, title: e.target.value } : prev)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Konu</label>
                    <input
                      type="text"
                      value={editingContent.topic}
                      onChange={(e) => setEditingContent(prev => prev ? { ...prev, topic: e.target.value } : prev)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Açıklama</label>
                  <textarea
                    value={editingContent.content_data?.description || ''}
                    onChange={(e) => setEditingContent(prev => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        content_data: {
                          ...prev.content_data,
                          description: e.target.value
                        }
                      };
                    })}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                    rows={3}
                  />
                </div>

                {/* Questions */}
                {isQuiz && editingContent.content_data?.questions && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">Sorular</h4>
                    {editingContent.content_data.questions.map((question, questionIndex) => (
                      <div key={questionIndex} className="bg-white/5 rounded-2xl p-4 mb-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-white mb-2">
                            Soru {questionIndex + 1}
                          </label>
                          <textarea
                            value={question.question}
                            onChange={(e) => setEditingContent(prev => {
                              if (!prev) return prev;
                              const updated = { ...prev };
                              updated.content_data.questions = [...updated.content_data.questions!];
                              updated.content_data.questions[questionIndex] = {
                                ...updated.content_data.questions[questionIndex],
                                question: e.target.value
                              };
                              return updated;
                            })}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                            rows={2}
                          />
                        </div>

                        {question.options && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-white mb-2">Seçenekler</label>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="mb-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => setEditingContent(prev => {
                                    if (!prev) return prev;
                                    const updated = { ...prev };
                                    updated.content_data.questions = [...updated.content_data.questions!];
                                    updated.content_data.questions[questionIndex] = {
                                      ...updated.content_data.questions[questionIndex],
                                      options: [...updated.content_data.questions[questionIndex].options!]
                                    };
                                    updated.content_data.questions[questionIndex].options![optionIndex] = e.target.value;
                                    return updated;
                                  })}
                                  className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                                  placeholder={`Seçenek ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-white mb-2">
                            Doğru Cevap
                          </label>
                          <select
                            value={question.correct.toString()}
                            onChange={(e) => setEditingContent(prev => {
                              if (!prev) return prev;
                              const updated = { ...prev };
                              updated.content_data.questions = [...updated.content_data.questions!];
                              updated.content_data.questions[questionIndex] = {
                                ...updated.content_data.questions[questionIndex],
                                correct: parseInt(e.target.value)
                              };
                              return updated;
                            })}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                          >
                            {question.options?.map((_, index) => (
                              <option key={index} value={index} className="bg-gray-800">
                                {String.fromCharCode(65 + index)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-white mb-2">
                            Açıklama (Opsiyonel)
                          </label>
                          <textarea
                            value={editingContent.content_data?.questions?.[questionIndex]?.explanation || ''}
                            onChange={(e) => setEditingContent(prev => {
                              if (!prev) return prev;
                              const updated = { ...prev };
                              updated.content_data.questions = [...updated.content_data.questions!];
                              updated.content_data.questions[questionIndex] = {
                                ...updated.content_data.questions[questionIndex],
                                explanation: e.target.value
                              };
                              return updated;
                            })}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                            rows={2}
                            placeholder="Soru için açıklama ekleyin..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={saving}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 