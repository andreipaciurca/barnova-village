import { translations, Language } from '@/lib/i18n';
import { headers } from 'next/headers';
import { Navbar } from '@/components/ui/Navbar';
import * as motion from 'framer-motion/client';

export default async function Loading() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang: Language = acceptLanguage.startsWith('en') ? 'en' : 'ro';
  const t = translations[lang];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Liquid Background Elements (Same as page.tsx for continuity) */}
      <div className="liquid-bg">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/30 rounded-full mix-blend-soft-light dark:mix-blend-multiply opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-accent/30 rounded-full mix-blend-soft-light dark:mix-blend-multiply opacity-50" />
      </div>

      <Navbar lang={lang} t={t} />

      <main className="flex-grow flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">
            {lang === 'ro' ? 'Se încarcă portalul...' : 'Loading portal...'}
          </p>
        </div>
      </main>
    </div>
  );
}
