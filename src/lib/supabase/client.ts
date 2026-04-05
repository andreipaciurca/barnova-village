import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a dummy client during build to avoid errors
    console.warn('Supabase credentials missing. Returning dummy client.')
    return {
      auth: { signInWithOtp: async () => ({ error: null }) },
      from: () => ({ select: () => ({ order: () => ({ limit: () => ({ data: [] }) }) }) })
    } as any
  }

  return createBrowserClient(url, key)
}
