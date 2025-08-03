'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, BookOpen, Target, Clock, 
  CheckCircle2, Play, Lock, Star, TrendingUp
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  duration: number; // dakika
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  locked: boolean;
  description: string;
  topics: string[];
  quizCount: number;
}

export default function LessonsPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 'lesson-1',
      title: 'Kesirler',
      subject: 'Matematik',
      grade: 5,
      duration: 45,
      difficulty: 'easy',
      completed: false,
      locked: false,
      description: 'Kesirler konusunu öğren ve pratik yap',
      topics: ['Kesir tanımı', 'Kesir türleri', 'Kesir işlemleri'],
      quizCount: 3
    },
    {
      id: 'lesson-2',
      title: 'Geometrik Şekiller',
      subject: 'Matematik',
      grade: 5,
      duration: 60,
      difficulty: 'medium',
      completed: false,
      locked: false,
      description: 'Temel geometrik şekilleri tanı ve özelliklerini öğren',
      topics: ['Üçgen', 'Dikdörtgen', 'Kare', 'Daire'],
      quizCount: 4
    },
    {
      id: 'lesson-3',
      title: 'Maddenin Halleri',
      subject: 'Fen Bilgisi',
      grade: 5,
      duration: 50,
      difficulty: 'easy',
      completed: true,
      locked: false,
      description: 'Maddenin katı, sıvı ve gaz hallerini öğren',
      topics: ['Katı madde', 'Sıvı madde', 'Gaz madde', 'Hâl değişimi'],
      quizCount: 2
    },
    {
      id: 'lesson-4',
      title: 'Cümle Türleri',
      subject: 'Türkçe',
      grade: 5,
      duration: 40,
      difficulty: 'medium',
      completed: false,
      locked: false,
      description: 'Cümle türlerini tanı ve örneklerle pekiştir',
      topics: ['Basit cümle', 'Birleşik cümle', 'Sıralı cümle'],
      quizCount: 3
    },
    {
      id: 'lesson-5',
      title: 'İklim ve Hava',
      subject: 'Sosyal Bilgiler',
      grade: 5,
      duration: 55,
      difficulty: 'hard',
      completed: false,
      locked: true,
      description: 'İklim ve hava olaylarını öğren',
      topics: ['İklim türleri', 'Hava olayları', 'Mevsimler'],
      quizCount: 5
    }
  ]);

  const subjects = ['all', 'Matematik', 'Fen Bilgisi', 'Türkçe', 'Sosyal Bilgiler'];

  const filteredLessons = selectedSubject === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.subject === selectedSubject);

  const handleBackToDashboard = () => {
    router.push('/student/dashboard');
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.locked) {
      alert('Bu ders henüz kilitli. Önceki dersleri tamamlaman gerekiyor.');
      return;
    }
    
    // Ders detay sayfasına yönlendir (gelecekte oluşturulacak)
    router.push(`/lessons/${lesson.id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Kolay';
      case 'medium': return 'Orta';
      case 'hard': return 'Zor';
      default: return 'Bilinmiyor';
    }
  };

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
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">Dersler</span>
            </div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Dashboard&apos;a Dön</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Derslerini Keşfet</h1>
          <p className="text-xl text-gray-300">Yeni konuları öğren ve bilgini artır!</p>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedSubject(subject)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/50'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              {subject === 'all' ? 'Tümü' : subject}
            </motion.button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLessonClick(lesson)}
              className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                lesson.locked ? 'opacity-50' : 'hover:bg-white/15'
              }`}
            >
              {/* Lesson Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{lesson.subject} • {lesson.grade}. Sınıf</p>
                </div>
                <div className="flex items-center space-x-2">
                  {lesson.completed && (
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {lesson.locked && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson Description */}
              <p className="text-gray-300 text-sm mb-4">{lesson.description}</p>

              {/* Lesson Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{lesson.duration} dk</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{lesson.quizCount} quiz</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)} text-white`}>
                  {getDifficultyText(lesson.difficulty)}
                </div>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">Konular:</p>
                <div className="flex flex-wrap gap-2">
                  {lesson.topics.slice(0, 3).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                    >
                      {topic}
                    </span>
                  ))}
                  {lesson.topics.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      +{lesson.topics.length - 3} daha
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  lesson.locked
                    ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    : lesson.completed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                }`}
                disabled={lesson.locked}
              >
                {lesson.locked ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Kilitli</span>
                  </>
                ) : lesson.completed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Tekrar İzle</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Derse Başla</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">İlerleme Özeti</h3>
              <p className="text-gray-300">Ders tamamlama durumun</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {lessons.filter(l => l.completed).length}/{lessons.length}
              </div>
              <p className="text-gray-300">Tamamlanan Ders</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)}%
              </div>
              <p className="text-gray-300">Tamamlanma Oranı</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {lessons.filter(l => !l.locked).length}
              </div>
              <p className="text-gray-300">Açık Ders</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {lessons.reduce((total, lesson) => total + lesson.quizCount, 0)}
              </div>
              <p className="text-gray-300">Toplam Quiz</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 