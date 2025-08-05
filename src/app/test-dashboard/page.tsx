'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

export default function TestDashboard() {
  const [status, setStatus] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          setStatus('Auth error: ' + error.message)
          return
        }
        
        if (!user) {
          setStatus('No user found')
          return
        }
        
        setUser(user)
        setStatus('User authenticated: ' + user.email)
        
      } catch (error) {
        setStatus('Error: ' + (error as Error).message)
      }
    }
    
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Test Dashboard</h1>
        <div className="space-y-4">
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-200">{status}</p>
          </div>
          {user && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-200">User ID: {user.id}</p>
              <p className="text-green-200">Email: {user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 