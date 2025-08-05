import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Type-safe Supabase client type
type SupabaseClient = ReturnType<typeof supabaseCreateClient<Database>>

// Singleton pattern - tek bir instance oluştur ve type safety ekle
let supabaseClient: SupabaseClient | null = null

const createSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = supabaseCreateClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      }
    )
  }
  return supabaseClient
}

const supabase = createSupabaseClient()

export default supabase

// Alternative export for consistency
export const createClient = createSupabaseClient 