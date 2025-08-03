'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabaseClient'
import { ThemeToggle } from '@/components/theme-toggle'

export default function TestPage() {
  const [status, setStatus] = useState('Test ediliyor...')
  const [tables, setTables] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // 1. Supabase bağlantısını test et
        setStatus('Supabase bağlantısı test ediliyor...')
        const { data, error } = await supabase.from('students').select('count').limit(1)
        
        if (error) {
          setError(`Bağlantı hatası: ${error.message}`)
          setStatus('Bağlantı başarısız')
          return
        }

        setStatus('Bağlantı başarılı! Tablolar kontrol ediliyor...')

        // 2. Mevcut tabloları kontrol et
        const tableNames = [
          'students', 'parents', 'parent_student_links', 
          'content', 'quiz_attempts', 'teacher_applications',
          'superadmins', 'teachers'
        ]

        const existingTables: string[] = []
        
        for (const tableName of tableNames) {
          try {
            const { error: tableError } = await supabase
              .from(tableName)
              .select('*')
              .limit(1)
            
            if (!tableError) {
              existingTables.push(tableName)
            }
          } catch (e) {
            // Tablo yok
          }
        }

        setTables(existingTables)
        setStatus('Test tamamlandı!')

      } catch (err) {
        setError(`Genel hata: ${err}`)
        setStatus('Test başarısız')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">i-EP</h1>
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-card rounded-lg shadow-lg p-8 border">
          <h1 className="text-2xl font-bold mb-6">Supabase Bağlantı Testi</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <h2 className="font-semibold mb-2">Durum:</h2>
              <p className={status.includes('başarılı') ? 'text-green-600' : 'text-blue-600'}>
                {status}
              </p>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <h2 className="font-semibold mb-2 text-destructive">Hata:</h2>
                <p className="text-destructive">{error}</p>
              </div>
            )}

            {tables.length > 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                <h2 className="font-semibold mb-2 text-green-800 dark:text-green-200">Mevcut Tablolar:</h2>
                <ul className="list-disc list-inside space-y-1">
                  {tables.map(table => (
                    <li key={table} className="text-green-700 dark:text-green-300">✓ {table}</li>
                  ))}
                </ul>
              </div>
            )}

            {tables.length === 0 && !error && status === 'Test tamamlandı!' && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <h2 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Uyarı:</h2>
                <p className="text-yellow-700 dark:text-yellow-300">Hiçbir tablo bulunamadı. Veritabanı henüz kurulmamış olabilir.</p>
              </div>
            )}

            <div className="mt-6">
              <a 
                href="/login" 
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                Login Sayfasına Git
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 