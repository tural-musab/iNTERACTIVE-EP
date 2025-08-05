import { createClient } from '@supabase/supabase-js'

// Singleton pattern - tek bir instance oluştur
let supabaseClient: ReturnType<typeof createClient> | null = null

const createSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
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