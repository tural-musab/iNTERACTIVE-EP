'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Sparkles, Home, ArrowLeft, AlertTriangle, Clock, 
  Lock, RefreshCw, User, LogIn, Mail, Shield,
  Zap, Brain, Users, BookOpen, Calculator, Play,
  Heart, Star, Trophy, Award, CheckCircle2,
  GraduationCap, UserCheck, Settings, HelpCircle,
  ExternalLink, RotateCcw, ArrowRight, XCircle,
    AlertCircle, Key, Unlock, Eye, EyeOff
} from 'lucide-react'

export default function ExpiredLinkPage() {
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
                  <h1 className="text-2xl font-bold text-white">Link Süresi Doldu</h1>
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-400 to-orange-500 text-white text-sm font-medium rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    Süresi Dolmuş
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
            {/* Expired Animation */}
            <div className="mb-8">
              <div className="w-48 h-48 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-6">
                Link Süresi Doldu!
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Üzgünüz, bu bağlantının süresi dolmuş veya zaten kullanılmış.
                <br />
                                 Yeni bir şifre sıfırlama isteği göndermek için lütfen giriş ekranından 
                 <span className="text-yellow-300 font-semibold">&quot;Şifremi Unuttum&quot;</span> seçeneğini tekrar kullanın.
              </p>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>

              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Güvenlik Uyarısı</h4>
                    <p className="text-gray-300 text-sm">Link süresi dolmuş. Yeni bir güvenli link oluşturmanız gerekiyor.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Giriş Yapın</h4>
                    <p className="text-gray-300 text-sm">Hesabınıza giriş yapın</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Mevcut hesabınızla giriş yaparak platforma erişebilirsiniz.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Yeni Link İste</h4>
                    <p className="text-gray-300 text-sm">Şifre sıfırlama linki</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                                     Giriş sayfasından &quot;Şifremi Unuttum&quot; seçeneğini kullanarak yeni bir link alın.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>Yeni Link İste</span>
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Yardıma mı ihtiyacınız var?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">SSS</span>
                  </div>
                  <p className="text-gray-300 text-sm">Sık sorulan sorular</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">Destek</span>
                  </div>
                  <p className="text-gray-300 text-sm">E-posta desteği</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Güvenlik</span>
                  </div>
                  <p className="text-gray-300 text-sm">Güvenlik rehberi</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Giriş Yap</span>
              </Link>
              
              <Link
                href="/"
                className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
              
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
