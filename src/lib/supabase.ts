import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
const enableMock = import.meta.env.VITE_ENABLE_MOCK !== 'false'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!isSupabaseConfigured && !enableMock) {
  console.warn(
    'Supabase variables are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  )
}
