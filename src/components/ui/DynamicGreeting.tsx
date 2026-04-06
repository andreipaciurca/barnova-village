'use client'

import { translations } from '@/lib/i18n'

function getGreeting() {
  const hour = new Date().getHours()
  const t = translations.ro.admin.dashboard

  if (hour >= 5 && hour < 12) {
    return t.greeting_morning
  }

  if (hour >= 12 && hour < 18) {
    return t.greeting_day
  }

  return t.greeting_evening
}

export function DynamicGreeting() {
  return <h2 className="mb-2 text-4xl font-black tracking-tight">{getGreeting()}</h2>
}
