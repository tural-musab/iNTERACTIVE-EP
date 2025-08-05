'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  X, Plus, Upload, Download, FileText, FileSpreadsheet, 
  BookOpen, Target, Calculator, Users, Clock, Award,
  Edit, Trash2, MoveUp, MoveDown, CheckCircle2
} from 'lucide-react'

interface Question {
  id: string
  type: 'multiple_choice' | 'true_false'
  question: string
  options: string[]
  correct_answer: number
  points: number
  explanation?: string
}

interface QuizData {
  instructions: string
  time_limit: number
  questions: Question[]
  passing_score: number
}

interface ContentFormProps {
  onSuccess: () => void
  onCancel: () => void
}

type FormField = 'title' | 'subject' | 'grade' | 'topic' | 'content_type' | 'description'
type QuestionField = keyof Question

export function ContentForm({ onSuccess, onCancel }: ContentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    subject: 'math',
    grade: 5,
    topic: '',
    content_type: 'lesson',
    description: ''
  })

  const [quizData, setQuizData] = useState<QuizData>({
    instructions: 'Her sorunun tek doğru cevabı vardır.',
    time_limit: 15,
    questions: [],
    passing_score: 60
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Kullanıcı bulunamadı')
      }

      const contentData = formData.content_type === 'quiz' ? quizData : {
        description: formData.description,
        sections: []
      }

      const { error } = await supabase
        .from('content')
        .insert([{
          title: formData.title,
          subject: formData.subject,
          grade: formData.grade,
          topic: formData.topic,
          content_type: formData.content_type,
          content_data: contentData,
          creator_id: user.id // Creator ID eklendi
        }])

      if (error) {
        throw error
      }

      onSuccess()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İçerik eklenirken bir hata oluştu'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: FormField, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correct_answer: 0,
      points: 10,
      explanation: ''
    }
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
  }

  const updateQuestion = (questionId: string, field: QuestionField, value: string | number) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }))
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          const newOptions = [...q.options]
          newOptions[optionIndex] = value
          return { ...q, options: newOptions }
        }
        return q
      })
    }))
  }

  const removeQuestion = (questionId: string) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
  }

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuizData(prev => {
      const questions = [...prev.questions]
      const index = questions.findIndex(q => q.id === questionId)
      if (index === -1) return prev

      if (direction === 'up' && index > 0) {
        [questions[index], questions[index - 1]] = [questions[index - 1], questions[index]]
      } else if (direction === 'down' && index < questions.length - 1) {
        [questions[index], questions[index + 1]] = [questions[index + 1], questions[index]]
      }

      return { ...prev, questions }
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileType = file.name.split('.').pop()?.toLowerCase()
    
    if (fileType === 'json') {
      await handleJSONUpload(file)
    } else if (fileType === 'csv') {
      await handleCSVUpload(file)
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      await handleExcelUpload(file)
    }
  }

  const handleJSONUpload = async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      if (data.questions && Array.isArray(data.questions)) {
        const questions: Question[] = data.questions.map((q: any, index: number) => ({
          id: Date.now().toString() + index,
          type: 'multiple_choice',
          question: q.question || '',
          options: q.options || ['', '', '', ''],
          correct_answer: q.correct || 0,
          points: q.points || 10,
          explanation: q.explanation || ''
        }))
        
        setQuizData(prev => ({
          ...prev,
          questions: [...prev.questions, ...questions]
        }))
      }
    } catch (error) {
      setError('JSON dosyası okunamadı')
    }
  }

  const handleCSVUpload = async (file: File) => {
    try {
      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())
      const questions: Question[] = []

      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',').map(col => col.replace(/"/g, '').trim())
        if (columns.length >= 6) {
          questions.push({
            id: Date.now().toString() + i,
            type: 'multiple_choice',
            question: columns[0],
            options: [columns[1], columns[2], columns[3], columns[4]],
            correct_answer: columns[5] === 'A' ? 0 : columns[5] === 'B' ? 1 : columns[5] === 'C' ? 2 : 3,
            points: parseInt(columns[6]) || 10,
            explanation: columns[7] || ''
          })
        }
      }

      setQuizData(prev => ({
        ...prev,
        questions: [...prev.questions, ...questions]
      }))
    } catch (error) {
      setError('CSV dosyası okunamadı')
    }
  }

  const handleExcelUpload = async (file: File) => {
    // Excel dosyaları için CSV olarak işle
    await handleCSVUpload(file)
  }

  const downloadTemplate = (type: 'csv' | 'json' | 'excel') => {
    if (type === 'json') {
      const jsonContent = {
        questions: [
          {
            question: "2+2 kaçtır?",
            options: ["3", "4", "5", "6"],
            correct: 1,
            points: 10,
            explanation: "2+2=4'tür"
          },
          {
            question: "3x5 kaçtır?",
            options: ["12", "15", "18", "20"],
            correct: 1,
            points: 10,
            explanation: "3x5=15'tir"
          }
        ]
      }
      
      const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'quiz_sorulari_sablonu.json'
      link.click()
    } else if (type === 'csv') {
      const csvContent = `Soru,Seçenek A,Seçenek B,Seçenek C,Seçenek D,Doğru Cevap,Puan,Açıklama
"2+2 kaçtır?","3","4","5","6","B","10","2+2=4'tür"
"3x5 kaçtır?","12","15","18","20","B","10","3x5=15'tir"`
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'quiz_sorulari_sablonu.csv'
      link.click()
    } else if (type === 'excel') {
      const csvContent = `Soru,Seçenek A,Seçenek B,Seçenek C,Seçenek D,Doğru Cevap,Puan,Açıklama
"2+2 kaçtır?","3","4","5","6","B","10","2+2=4'tür"
"3x5 kaçtır?","12","15","18","20","B","10","3x5=15'tir"`
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'quiz_sorulari_sablonu.xlsx'
      link.click()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Yeni İçerik Ekle
              </h2>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:text-yellow-300 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  placeholder="Örn: Kesirler - Giriş"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                  placeholder="Örn: Kesirler"
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  İçerik Türü *
                </label>
                <select
                  value={formData.content_type}
                  onChange={(e) => handleInputChange('content_type', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                >
                  <option value="lesson" className="bg-gray-800">Ders</option>
                  <option value="quiz" className="bg-gray-800">Quiz</option>
                </select>
              </div>
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                rows={3}
                placeholder="İçerik hakkında kısa açıklama..."
              />
            </div>

            {/* Quiz Ayarları */}
            {formData.content_type === 'quiz' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Talimatlar
                    </label>
                    <textarea
                      value={quizData.instructions}
                      onChange={(e) => setQuizData(prev => ({ ...prev, instructions: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Süre (dakika)
                    </label>
                    <input
                      type="number"
                      value={quizData.time_limit}
                      onChange={(e) => setQuizData(prev => ({ ...prev, time_limit: parseInt(e.target.value) || 15 }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                      min="1"
                      max="120"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Geçme Puanı (%)
                    </label>
                    <input
                      type="number"
                      value={quizData.passing_score}
                      onChange={(e) => setQuizData(prev => ({ ...prev, passing_score: parseInt(e.target.value) || 60 }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Dosya Yükleme */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-semibold mb-4">Toplu Soru Yükleme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Dosya Seçin
                      </label>
                      <input
                        type="file"
                        accept=".json,.csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => downloadTemplate('json')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-2xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <FileText className="w-4 h-4" />
                        <span>JSON Şablonu</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadTemplate('csv')}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>CSV Şablonu</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sorular */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">Sorular ({quizData.questions.length})</h3>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>İlk Soruyu Ekle</span>
                    </button>
                  </div>

                  {quizData.questions.map((question, index) => (
                    <div key={question.id} className="bg-white/5 rounded-2xl p-6 border border-white/20">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white font-medium">Soru {index + 1}</h4>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => moveQuestion(question.id, 'up')}
                            disabled={index === 0}
                            className="text-white hover:text-yellow-300 disabled:text-gray-500 transition-colors duration-300"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveQuestion(question.id, 'down')}
                            disabled={index === quizData.questions.length - 1}
                            className="text-white hover:text-yellow-300 disabled:text-gray-500 transition-colors duration-300"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Soru Metni
                          </label>
                          <textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                            rows={2}
                            placeholder="Soru metnini yazın..."
                          />
                        </div>

                        {question.type === 'multiple_choice' && (
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Seçenekler
                            </label>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={`correct_${question.id}`}
                                    checked={question.correct_answer === optionIndex}
                                    onChange={() => updateQuestion(question.id, 'correct_answer', optionIndex)}
                                    className="text-yellow-400"
                                  />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                                    placeholder={`Seçenek ${optionIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Puan
                            </label>
                            <input
                              type="number"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
                              className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                              min="1"
                              max="100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Açıklama (opsiyonel)
                            </label>
                            <input
                              type="text"
                              value={question.explanation || ''}
                              onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                              placeholder="Doğru cevabın açıklaması..."
                              className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-lg transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hata Mesajı */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Ekleniyor...' : 'İçerik Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 