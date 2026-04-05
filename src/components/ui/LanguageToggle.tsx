'use client';

import React from 'react';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';

interface LanguageToggleProps {
  currentLang: Language;
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-muted/50 rounded-full p-1 ring-1 ring-border/50">
        <a 
          href="/?lang=ro" 
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
            currentLang === 'ro' 
              ? 'bg-background text-primary shadow-sm ring-1 ring-border/50' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          RO
        </a>
        <a 
          href="/?lang=en" 
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
            currentLang === 'en' 
              ? 'bg-background text-primary shadow-sm ring-1 ring-border/50' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          EN
        </a>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-9 h-9"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
