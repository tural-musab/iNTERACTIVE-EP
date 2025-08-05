'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, Target, TrendingUp, Clock, Activity, Lightbulb 
} from 'lucide-react'
import { MobileContainer, MobileGrid, MobileCard, MobileButton, MobileText, MobileSpacing } from '@/components/mobile/MobileOptimizations'

interface AnalyticsSummaryProps {
  userStats: any
  currentStreak: number
  isMobile?: boolean
}

export function AnalyticsSummary({ userStats, currentStreak, isMobile = false }: AnalyticsSummaryProps) {
  const router = useRouter()

  const analyticsData = [
    {
      icon: Target,
      label: 'Ortalama Skor',
      value: `${userStats?.averageAccuracy ? Math.round(userStats.averageAccuracy) : 0}%`,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: TrendingUp,
      label: 'İyileşme',
      value: `+${Math.floor(Math.random() * 15) + 5}%`,
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Clock,
      label: 'Çalışma Süresi',
      value: `${userStats?.totalTimeSpent ? Math.round(userStats.totalTimeSpent / 60) : 0} dk`,
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Activity,
      label: 'Aktiflik',
      value: `${currentStreak || 0} gün`,
      color: 'from-yellow-400 to-pink-500'
    }
  ]

  const insights = [
    { color: 'bg-green-400', text: 'Matematik konusunda güçlüsün!' },
    { color: 'bg-blue-400', text: 'Son 7 günde %12 iyileşme gösterdin' },
    { color: 'bg-purple-400', text: 'Fen Bilgisi konusunda daha fazla pratik yap' }
  ]

  if (isMobile) {
    return (
      <MobileCard>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <MobileText variant="h3" className="text-white">Analytics Özeti</MobileText>
              <MobileText variant="caption">Son performans durumun</MobileText>
            </div>
          </div>
          <MobileButton
            onClick={() => router.push('/analytics')}
            variant="primary"
            size="sm"
          >
            Detaylı Görüntüle
          </MobileButton>
        </div>

        <MobileGrid cols={{ mobile: 2, tablet: 4, desktop: 4 }} gap={{ mobile: 3, tablet: 4, desktop: 4 }}>
          {analyticsData.map((item, index) => (
            <div key={index} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <MobileText variant="caption" className="text-gray-300">{item.label}</MobileText>
              <MobileText variant="h4" className="text-white">{item.value}</MobileText>
            </div>
          ))}
        </MobileGrid>

        {/* Quick Insights - Mobile Optimized */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span>Hızlı İçgörüler</span>
          </h4>
          <MobileSpacing size="sm">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${insight.color} rounded-full`}></div>
                <MobileText variant="caption" className="text-gray-300">
                  {insight.text}
                </MobileText>
              </div>
            ))}
          </MobileSpacing>
        </div>
      </MobileCard>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Analytics Özeti</h3>
            <p className="text-gray-300 text-sm">Son performans durumun</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/analytics')}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          Detaylı Görüntüle
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analyticsData.map((item, index) => (
          <div key={index} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-300 text-xs">{item.label}</p>
            <p className="text-white font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span>Hızlı İçgörüler</span>
        </h4>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${insight.color} rounded-full`}></div>
              <span className="text-gray-300 text-sm">{insight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 