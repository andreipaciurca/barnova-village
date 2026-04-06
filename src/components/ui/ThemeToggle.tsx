'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-xl w-10 h-10 bg-background/50 border-border/50">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-xl w-10 h-10 bg-background/50 border-border/50 hover:bg-background transition-all"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-500 transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
