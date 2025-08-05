'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className = '' }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 ${className}`}>
      {children}
    </div>
  )
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  icon: Icon, 
  badge, 
  onBack, 
  onLogout, 
  showThemeToggle = true 
}: {
  title: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: { text: string; icon: React.ComponentType<{ className?: string }> }
  onBack?: () => void
  onLogout?: () => void
  showThemeToggle?: boolean
}) {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
              {badge && (
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-pink-400 to-violet-500 text-white text-sm font-medium rounded-full">
                  <badge.icon className="w-4 h-4 mr-1" />
                  {badge.text}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {onBack && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Geri Dön</span>
              </motion.button>
            )}
            {showThemeToggle && <ThemeToggle />}
            {onLogout && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Çıkış Yap</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 