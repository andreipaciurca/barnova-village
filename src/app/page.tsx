import { getPosts } from '@/lib/wordpress';
import { getNewsFeed, NewsItem } from '@/lib/news';
import { getAdministrationData } from '@/lib/administration';
import { getServerService } from '@/lib/supabase/services.server';
import { translations, Feature } from '@/lib/i18n';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import * as motion from 'framer-motion/client';
import { Navbar } from '@/components/ui/Navbar';
import { GovernanceSection } from '@/components/ui/GovernanceSection';
import Link from 'next/link';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Zap,
  Shield,
  Search,
  Users,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Landmark,
  Building2,
  Scale,
  Database,
  Gavel,
  ShieldCheck,
  MessageCircle,
  Camera,
  X
} from 'lucide-react';

export default async function Home() {
  const posts = await getPosts();
  const rssNews = await getNewsFeed();
  const adminData = await getAdministrationData();
  
  const service = await getServerService();
  const user = await service.getUser();
  const featureSettings = await service.getSettings('features');
  const isSarcastic = featureSettings.sarcastic_mode === true;

  const sarcasticTranslations = isSarcastic ? {
    hero: {
      title: 'Viitorul Comunei (Dacă avem noroc)',
      subtitle: 'O platformă atât de modernă încât primăria încă folosește faxul. Informații oficiale, servicii care sperăm să meargă și noutăți de acum doi ani.',
    },
    news: {
      title: 'Zvonuri și Anunțuri',
      subtitle: 'Ce am mai auzit prin sat sau ce ne-au obligat să postăm',
    },
    features: {
      digital: {
        title: 'Birocrație Digitală',
        description: 'Te rugăm să descarci PDF-ul, să-l scanezi și să-l trimiți prin porumbel voiajor.',
      },
      transparency: {
        title: 'Transparență de Fațadă',
        description: 'Decizii luate în spatele ușilor închise, dar postate aici pentru conformitate.',
      }
    }
  } : null;

  const t = sarcasticTranslations ? {
    ...translations.ro,
    hero: { ...translations.ro.hero, ...sarcasticTranslations.hero },
    news: { ...translations.ro.news, ...sarcasticTranslations.news },
    features: { 
      ...translations.ro.features, 
      digital: { ...translations.ro.features.digital, ...sarcasticTranslations.features.digital },
      transparency: { ...translations.ro.features.transparency, ...sarcasticTranslations.features.transparency }
    }
  } : translations.ro;

  const features = [
    { ...t.features.digital, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { ...t.features.administration, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { ...t.features.tourism, icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { ...t.features.transparency, icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Liquid Background Elements */}
      <div className="liquid-bg">
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full mix-blend-soft-light dark:mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
            rotate: [0, -20, 0]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-accent/20 rounded-full mix-blend-soft-light dark:mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -60, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/15 rounded-full mix-blend-soft-light dark:mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/15 rounded-full mix-blend-soft-light dark:mix-blend-multiply" 
        />
      </div>

      {/* Dynamic Navigation Component Wrapper */}
      <Navbar t={t} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden">
          {/* Ambient Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            {/* Secondary layer of ambient color for hero area */}
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 ring-1 ring-primary/20 backdrop-blur-md transform-gpu">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Portal Digital Oficial v2.1
              </div>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-6xl md:text-[9rem] font-black tracking-tight text-foreground mb-10 text-balance leading-[0.9] drop-shadow-sm grainy-text"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed text-muted-foreground mb-10 text-balance font-semibold opacity-90"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <a href="#news" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full h-16 px-12 text-lg shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                  {t.hero.cta_news}
                </Button>
              </a>
              <a href="#" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full rounded-full h-16 px-12 text-lg bg-background/50 backdrop-blur-md border-border/50 active:scale-95 transition-all transform-gpu">
                  {t.hero.cta_services} <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Background Grid Pattern */}
        <div className="fixed inset-0 -z-20 opacity-[0.03] pointer-events-none dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        {/* Stats & Infographics Section */}
        <section id="admin" className="py-16 relative overflow-hidden contain-layout">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 ring-1 ring-emerald-500/20 backdrop-blur-md"
              >
                <Activity className="w-3 h-3" />
                Date Live
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{t.features.stats.title}</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">{t.features.stats.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: t.features.stats.population, value: 7913, suffix: '', sub: '+12%', icon: Users, color: 'text-blue-500' },
                { label: t.features.stats.area, value: 42.35, suffix: ' km²', sub: 'Regiune Metr.', icon: MapPin, color: 'text-emerald-500' },
                { label: t.features.stats.birth_rate, value: 11.7, suffix: '‰', sub: '> Media Jud.', icon: TrendingUp, color: 'text-amber-500' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.15, 
                    ease: [0.21, 1.11, 0.81, 0.99] 
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center text-center group relative overflow-hidden backdrop-blur-2xl"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div 
                    initial={{ rotate: -10, scale: 0.8 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                    className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/80 dark:bg-background shadow-xl shadow-primary/5 relative z-10", stat.color)}
                  >
                    <stat.icon className="w-7 h-7" />
                  </motion.div>
                  
                  <div className="text-4xl font-black mb-2 flex items-baseline gap-1 relative z-10">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.15 + 0.4 }}
                    >
                      {stat.value.toLocaleString()}
                    </motion.span>
                    <span className="text-xl opacity-60 font-bold">{stat.suffix}</span>
                  </div>
                  
                  <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 relative z-10">{stat.label}</div>
                  
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "auto", opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.6, duration: 0.5 }}
                    className="px-4 py-1.5 rounded-full bg-primary/5 text-[10px] font-black text-primary border border-primary/10 relative z-10"
                  >
                    {stat.sub}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-card p-10 rounded-[3rem] relative overflow-hidden group backdrop-blur-3xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/20 transition-colors duration-1000" />
                
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div>
                    <h3 className="text-2xl font-black mb-1 text-primary/80 dark:text-primary-foreground">{t.features.stats.budget_title}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Execuție Bugetară Anuală</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-10 relative z-10">
                  {[
                    { label: t.features.stats.investments, val: 45, color: 'from-blue-600 to-indigo-600', icon: TrendingUp },
                    { label: t.features.stats.salaries, val: 30, color: 'from-emerald-500 to-teal-500', icon: Users },
                    { label: t.features.stats.others, val: 25, color: 'from-amber-500 to-orange-500', icon: Activity },
                  ].map((item, i) => (
                    <div key={item.label} className="group/item">
                      <div className="flex justify-between items-end mb-3">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="text-lg font-black"
                        >
                          {item.val}%
                        </motion.span>
                      </div>
                      <div className="h-5 bg-muted/50 rounded-full overflow-hidden p-1 shadow-inner ring-1 ring-border/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          transition={{ duration: 1.5, delay: i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                          className={cn("h-full rounded-full shadow-lg bg-linear-to-r", item.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center text-center relative overflow-hidden group backdrop-blur-3xl"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-1000" />
                
                <div className="w-full flex items-center justify-between mb-12 relative z-10">
                  <div className="text-left">
                    <h3 className="text-2xl font-black mb-1 text-emerald-600 dark:text-emerald-400">Distribuție Vârstă</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Structură Demografică</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/10">
                    <PieChart className="w-6 h-6" />
                  </div>
                </div>

                <div className="relative w-64 h-64 mb-10 group/pie z-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 filter drop-shadow-2xl">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/20" />
                    
                    {/* Background track for effect */}
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--primary)" strokeWidth="12" strokeOpacity="0.1" strokeDasharray="263.89" />
                    
                    <motion.circle 
                      cx="50" cy="50" r="42" fill="transparent" 
                      stroke="var(--primary)" strokeWidth="12" 
                      strokeDasharray="263.89"
                      initial={{ strokeDashoffset: 263.89 }}
                      whileInView={{ strokeDashoffset: 263.89 * (1 - 0.706) }}
                      transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="text-5xl font-black text-primary tracking-tighter"
                    >
                      70.6%
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.6 }}
                      transition={{ delay: 1.2 }}
                      className="text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                      Populație Activă
                    </motion.span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 w-full relative z-10">
                  {[
                    { val: '19.3%', label: '0-14 Ani', color: 'text-foreground' },
                    { val: '70.6%', label: '15-64 Ani', color: 'text-primary' },
                    { val: '10.1%', label: '65+ Ani', color: 'text-foreground' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className={cn("text-xl font-black mb-1", item.color)}>{item.val}</div>
                      <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="services" className="py-16 bg-muted/30 relative contain-layout">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black mb-4"
              >
                Descoperiți Facilitățile
              </motion.h2>
              <p className="text-muted-foreground text-lg">Tot ce aveți nevoie într-un singur loc.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "bento-card group h-full flex flex-col justify-between overflow-hidden relative",
                    idx === 0 || idx === 3 ? "md:col-span-2" : "md:col-span-2"
                  )}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <feature.icon className="w-32 h-32" />
                  </div>

                  <div>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-3 duration-500 shadow-lg", feature.bg, feature.color)}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 font-medium">{feature.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {feature.items.map(item => (
                      <span key={item} className="px-3 py-1 bg-background/50 backdrop-blur-sm border border-border/50 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all group-hover:text-primary group-hover:border-primary/30 group-hover:scale-105 transform-gpu">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Administration Section */}
        <GovernanceSection data={adminData} t={t.features} />

        {/* News & Social Section */}
        <section id="news" className="py-16 max-w-7xl mx-auto px-6 lg:px-8 contain-layout">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest mb-4">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    {t.news.official_tag}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t.news.title}</h2>
                  <p className="text-muted-foreground mt-4 text-xl font-medium">{t.news.subtitle}</p>
                </div>
                <a href="https://primariabarnova.ro" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-primary font-black hover:gap-3 transition-all">
                  {t.news.view_all}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rssNews.length > 0 ? rssNews.slice(0, 4).map((news, idx) => (
                  <motion.div
                    key={news.link}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <Card className="group h-full flex flex-col border-none shadow-none bg-muted/50 hover:bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-8">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                            {t.news.official_tag}
                          </span>
                          <time className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                            {new Date(news.pubDate).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </time>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <h3 
                            className="text-xl font-black mb-6 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: news.title }}
                          />
                          {news.contentSnippet && (
                            <div 
                              className="text-muted-foreground leading-relaxed line-clamp-3 font-medium text-sm"
                              dangerouslySetInnerHTML={{ __html: news.contentSnippet }}
                            />
                          )}
                        </CardContent>
                        <CardFooter className="pt-8">
                          <div className="flex items-center gap-2 text-sm font-black text-primary group/btn">
                            {t.news.read_more}
                            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </div>
                        </CardFooter>
                      </Card>
                    </a>
                  </motion.div>
                )) : posts.slice(0, 4).map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="group h-full flex flex-col border-none shadow-none bg-muted/50 hover:bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem]">
                      <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                          {t.news.official_tag}
                        </span>
                        <time className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                          {new Date(post.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </time>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <h3 
                          className="text-xl font-black mb-6 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div 
                          className="text-muted-foreground leading-relaxed line-clamp-3 font-medium"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                      </CardContent>
                      <CardFooter className="pt-8">
                        <button className="flex items-center gap-2 text-sm font-black text-primary group/btn">
                          {t.news.read_more}
                          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
                <span className="w-8 h-[2px] bg-primary"></span>
                Social Media
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bento-card bg-primary/5 border-primary/20 overflow-hidden relative flex flex-col h-full min-h-[500px]"
              >
                <div className="p-8 relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight leading-none mb-2">Facebook</h3>
                      <p className="text-muted-foreground text-sm font-bold">@primariabirnova</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center text-center space-y-6">
                    <div className="relative mx-auto w-32 h-32">
                      <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-ping" />
                      <div className="relative w-32 h-32 bg-white dark:bg-slate-900 rounded-full border-4 border-primary flex items-center justify-center shadow-2xl">
                        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-lg">B</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-black mb-2">Rămâneți conectați</h4>
                      <p className="text-muted-foreground font-medium px-4">
                        Urmăriți-ne pe Facebook pentru ultimele postări, evenimente și transmisiuni live direct din comunitate.
                      </p>
                    </div>

                    <a 
                      href="https://www.facebook.com/primariabirnova" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20"
                    >
                      Urmărește Pagina
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                {/* Visual accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-primary to-accent" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="archive" className="relative py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bento-card border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6"
                  >
                    <Clock className="w-4 h-4" />
                    {t.archive.title}
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-balance leading-none grainy-text">
                    {t.archive.subtitle}
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl font-semibold leading-relaxed mb-10 text-balance opacity-80">
                    {t.archive.description}
                  </p>
                  <a href="https://primariabarnova.ro" target="_blank" rel="noopener noreferrer">
                    <Button size="xl" className="rounded-full font-black text-lg gap-3 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                      {t.archive.cta}
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-white/20 backdrop-blur-3xl rounded-[3rem] border border-white/30 flex items-center justify-center p-8 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700 bg-[url('https://primariabarnova.ro/wp-content/uploads/2017/05/poza_panoramica.jpg')] bg-cover bg-center" />
                    <div className="relative z-10 w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl">B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-muted/50 border-t border-border/50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
              <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20">B</div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none">Comuna Bârnova</span>
                  <div className="flex gap-2 mt-2">
                    <div className="w-8 h-5 flex flex-col shadow-sm ring-1 ring-black/5">
                      <div className="h-1/3 bg-[#002B7F]"></div>
                      <div className="h-1/3 bg-[#FCD116]"></div>
                      <div className="h-1/3 bg-[#CE1126]"></div>
                    </div>
                    <div className="w-8 h-5 bg-[#003399] flex items-center justify-center relative overflow-hidden shadow-sm ring-1 ring-black/5">
                      <div className="w-4 h-4 rounded-full border border-yellow-400 border-dashed opacity-50 scale-150"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 opacity-80">
                {t.footer.disclaimer}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                {t.footer.tagline}
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8">{t.footer.useful_links}</h4>
              <ul className="space-y-4">
                {[
                  { label: t.footer.portal, href: '#', icon: Users },
                  { label: t.footer.payments, href: 'https://www.ghiseul.ro', icon: Zap },
                  { label: t.footer.documents, href: '#', icon: Clock },
                  { label: t.footer.transparency, href: '#', icon: Shield },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground font-semibold transition-colors flex items-center group">
                      <link.icon className="w-4 h-4 mr-2 text-primary/40 group-hover:text-primary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8">{t.footer.official_resources}</h4>
              <ul className="space-y-4">
                {[
                  { label: t.footer.ghiseul, href: 'https://www.ghiseul.ro', icon: Landmark },
                  { label: t.footer.mai, href: 'https://www.mai.gov.ro', icon: ShieldCheck },
                  { label: t.footer.gov, href: 'https://www.gov.ro', icon: Building2 },
                  { label: t.footer.data_gov, href: 'https://data.gov.ro', icon: Database },
                  { label: t.footer.dna, href: 'https://www.dna.ro', icon: Gavel },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground font-semibold transition-colors flex items-center group">
                      <link.icon className="w-4 h-4 mr-2 text-primary/40 group-hover:text-primary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8">{t.footer.contact}</h4>
              <ul className="space-y-6">
                {[
                  { icon: MapPin, text: 'Str. Nicolae Titulescu Nr. 10, Bârnova' },
                  { icon: Mail, text: 'contact@primariabarnova.ro' },
                  { icon: Phone, text: '+40 232 294 120' },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border/50 flex flex-shrink-0 items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-muted-foreground font-semibold leading-relaxed pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <div>&copy; {new Date().getFullYear()} {t.footer.copyright}</div>
            <div className="flex items-center gap-3">
              {user && (
                <Link href="/admin/dashboard" className="text-primary hover:underline bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mr-4">
                  Admin Dashboard
                </Link>
              )}
              <span className="opacity-50">{t.footer.created_by}</span>
              <a href="https://andreipaciurca.github.io" className="text-foreground hover:text-primary transition-colors bg-accent/50 px-4 py-2 rounded-full border border-border/50">
                Andrei Alexandru Paciurca
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
