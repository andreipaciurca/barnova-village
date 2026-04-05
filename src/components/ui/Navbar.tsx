'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Language } from '@/lib/i18n';
import { Button } from './Button';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  t: any;
}

export function Navbar({ lang, t }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const isAtBottom = latest + windowHeight >= documentHeight - 50;

    if (latest > previous && latest > 150 && !isAtBottom) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else if (previous > latest || isAtBottom) {
      setHidden(false);
    }
  });

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.admin, href: '#admin' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.tourism, href: '#tourism' },
    { label: t.nav.dashboard, href: '/admin/dashboard' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-[60] px-4 pt-4">
      <motion.div 
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -100, opacity: 0, scale: 0.95 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-7xl mx-auto glass rounded-3xl md:rounded-full transform-gpu overflow-hidden"
      >
        <div className="flex justify-between h-16 md:h-20 items-center px-4 md:px-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20 text-xl border border-white/10">B</div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-foreground tracking-tight leading-none">
                {lang === 'ro' ? 'Comuna Bârnova' : 'Bârnova Village'}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase mt-1 hidden sm:block">
                Portal Oficial
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="px-5 py-2.5 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary transition-all rounded-full hover:bg-primary/5 active:scale-95 relative group"
              >
                {item.label}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 mr-2">
              <LanguageToggle currentLang={lang} />
            </div>
            
            <a href="#contact" className="hidden md:block">
              <Button size="md" className="rounded-full px-8 shadow-xl bg-primary hover:bg-primary/90 text-white border-none transform-gpu active:scale-95 transition-all">
                {t.nav.contact}
              </Button>
            </a>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary active:scale-90 transition-transform"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border/10 bg-background/50 backdrop-blur-xl transform-gpu"
            >
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item) => (
                    <a 
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 text-foreground font-bold active:scale-[0.98] transition-all"
                    >
                      {item.label}
                      <ChevronRight className="w-5 h-5 text-primary/50" />
                    </a>
                  ))}
                </div>
                
                <div className="pt-4 flex items-center justify-between">
                  <LanguageToggle currentLang={lang} />
                  <a href="#contact">
                    <Button className="rounded-2xl px-8 transform-gpu active:scale-95 transition-all">
                      {t.nav.contact}
                    </Button>
                  </a>
                </div>
                
                <div className="pt-6 border-t border-border/10 grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    Str. Nicolae Titulescu Nr. 10
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <Phone className="w-4 h-4 text-primary" />
                    +40 232 294 120
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
