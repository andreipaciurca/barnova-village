'use client';

import React from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface AdminLanguageToggleProps {
  currentLang: 'ro' | 'en';
}

export function AdminLanguageToggle({ currentLang }: AdminLanguageToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center bg-muted/50 rounded-xl p-1 ring-1 ring-border/50 w-full">
      <button
        onClick={() => handleLanguageChange('ro')}
        className={cn(
          'flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all',
          currentLang === 'ro'
            ? 'bg-background text-primary shadow-sm ring-1 ring-border/50'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        RO
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={cn(
          'flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all',
          currentLang === 'en'
            ? 'bg-background text-primary shadow-sm ring-1 ring-border/50'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
    </div>
  );
}
