import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let cachedClient: ReturnType<typeof createSupabaseClient> | null = null

export function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  if (!cachedClient) {
    cachedClient = createSupabaseClient(url, key)
  }

  return cachedClient
}
