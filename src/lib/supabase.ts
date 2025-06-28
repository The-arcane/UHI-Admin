import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and/or Anon Key are not defined in .env.local')
}

// Note: This is a client-side Supabase client. 
// For server-side operations, especially with user authentication context,
// consider using @supabase/ssr package for better security and token management.
// For this project's custom auth, this unified client is sufficient.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
