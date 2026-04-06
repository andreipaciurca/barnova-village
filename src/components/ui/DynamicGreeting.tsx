'use client';

import React, { useEffect, useState } from 'react';
import { translations } from '@/lib/i18n';

export function DynamicGreeting() {
  const [greeting, setGreeting] = useState('');
  const t = translations.ro.admin.dashboard;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting(t.greeting_morning);
    } else if (hour >= 12 && hour < 18) {
      setGreeting(t.greeting_day);
    } else {
      setGreeting(t.greeting_evening);
    }
  }, [t]);

  // Default while mounting
  if (!greeting) return <h2 className="text-4xl font-black tracking-tight mb-2">...</h2>;

  return <h2 className="text-4xl font-black tracking-tight mb-2">{greeting}</h2>;
}
