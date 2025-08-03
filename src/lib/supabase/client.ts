import { createClient as supabaseCreateClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern - tek bir instance oluştur
let supabaseClient: ReturnType<typeof supabaseCreateClient> | null = null

export const createClient = () => {
  if (!supabaseClient) {
    supabaseClient = supabaseCreateClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
} 