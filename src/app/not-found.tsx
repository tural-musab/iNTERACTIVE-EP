'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Home, ArrowLeft, Search, AlertTriangle, 
  MapPin, Compass, Navigation, Globe, Target,
  Zap, Brain, Users, BookOpen, Calculator, Play,
  Heart, Star, Trophy, Award, Clock, CheckCircle2,
  User, GraduationCap, UserCheck, Settings, HelpCircle,
  ExternalLink, RefreshCw, RotateCcw, ArrowRight
} from 'lucide-react'

export default function NotFound() {
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
                <h1 className="text-2xl font-bold text-white">404 - Sayfa Bulunamadı</h1>
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-400 to-orange-500 text-white text-sm font-medium rounded-full">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Hata
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="w-48 h-48 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="text-8xl font-bold text-white">404</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              Oops! Sayfa Bulunamadı
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfaya dönerek doğru yolu bulabilirsiniz.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Yardıma mı ihtiyacınız var?</h4>
                  <p className="text-gray-300 text-sm">Aşağıdaki linklerden doğru sayfaya ulaşabilirsiniz.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Ana Sayfa</h4>
                    <p className="text-gray-300 text-sm">Platforma genel bakış</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                  <span>Ana sayfaya git</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/login" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Giriş Yap</h4>
                    <p className="text-gray-300 text-sm">Hesabınıza erişin</p>
                  </div>
                </div>
                <div className="flex items-center text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  <span>Giriş sayfasına git</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/teacher/register" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Kayıt Ol</h4>
                    <p className="text-gray-300 text-sm">Yeni hesap oluşturun</p>
                  </div>
                </div>
                <div className="flex items-center text-green-300 group-hover:text-green-200 transition-colors duration-300">
                  <span>Kayıt sayfasına git</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </div>

          {/* Popular Pages */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Popüler Sayfalar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/student/dashboard" className="group">
                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <span className="text-white group-hover:text-blue-300 transition-colors duration-300">Öğrenci</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/teacher/dashboard" className="group">
                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-green-400" />
                    <span className="text-white group-hover:text-green-300 transition-colors duration-300">Öğretmen</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/parent/dashboard" className="group">
                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-white group-hover:text-purple-300 transition-colors duration-300">Veli</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/admin/dashboard" className="group">
                <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-orange-400" />
                    <span className="text-white group-hover:text-orange-300 transition-colors duration-300">Admin</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Geri Git</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Yenile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 