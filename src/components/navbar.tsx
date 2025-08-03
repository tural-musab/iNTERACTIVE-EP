"use client"

import { useRouter } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import supabase from '@/lib/supabaseClient'

export function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">i-EP</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  )
} 