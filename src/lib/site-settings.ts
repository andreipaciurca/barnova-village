import { cache } from 'react'
import { getPublicSupabaseClient } from '@/lib/supabase/public'

export interface FeatureSettings {
  show_news: boolean
  show_stats: boolean
  show_weather: boolean
  sarcastic_mode: boolean
}

const DEFAULT_FEATURE_SETTINGS: FeatureSettings = {
  show_news: true,
  show_stats: true,
  show_weather: false,
  sarcastic_mode: false,
}

function toBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback
}

export const getPublicFeatureSettings = cache(async function getPublicFeatureSettings(): Promise<FeatureSettings> {
  const client = getPublicSupabaseClient()

  if (!client) {
    return DEFAULT_FEATURE_SETTINGS
  }

  const { data, error } = await client
    .from('site_settings')
    .select('value')
    .eq('id', 'features')
    .maybeSingle()

  const settingsRow = data as { value?: Record<string, unknown> } | null

  if (error || !settingsRow?.value) {
    return DEFAULT_FEATURE_SETTINGS
  }

  const value = settingsRow.value

  return {
    show_news: toBoolean(value.show_news, DEFAULT_FEATURE_SETTINGS.show_news),
    show_stats: toBoolean(value.show_stats, DEFAULT_FEATURE_SETTINGS.show_stats),
    show_weather: toBoolean(value.show_weather, DEFAULT_FEATURE_SETTINGS.show_weather),
    sarcastic_mode: toBoolean(value.sarcastic_mode, DEFAULT_FEATURE_SETTINGS.sarcastic_mode),
  }
})
