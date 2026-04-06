'use client';

import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Database, 
  Cloud, 
  Clock, 
  Cpu, 
  Server, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  BarChart3,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Zap,
  CheckCircle2,
  XCircle,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/i18n';

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  uptime: number;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  services: {
    vercel: {
      connected: boolean;
      environment: string;
      logsUrl: string | null;
    };
    supabase: {
      status: string;
      logsUrl: string;
    };
  };
  monitoring: {
    vercelDashboard: string;
    supabaseDashboard: string;
  };
}

const USEFUL_LINKS = [
  { name: 'Data.gov.ro', url: 'https://data.gov.ro', description: 'Portalul de date deschise al României' },
  { name: 'Gov.ro', url: 'https://www.gov.ro', description: 'Guvernul României' },
  { name: 'ANAF', url: 'https://www.anaf.ro', description: 'Agenția Națională de Administrare Fiscală' },
  { name: 'Ghișeul.ro', url: 'https://www.ghiseul.ro', description: 'Plata online a taxelor și impozitelor' },
];

export default function HealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const sarcasticTranslations = data?.status === 'UP' ? translations.ro.sarcastic.health : null;
  const t = sarcasticTranslations ? {
    ...translations.ro.health,
    ...sarcasticTranslations
  } : translations.ro.health;

  useEffect(() => {
    async function fetchHealth() {
      try {
        setLoading(true);
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error('Nu s-a putut comunica cu serverul de diagnoză.');
        const healthData = await res.json();
        setData(healthData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
  }, [refreshCount]);

  const formatMemory = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${days}z ${hours}o ${mins}m`;
  };

  const StatusBadge = ({ connected, label }: { connected: boolean | string, label: string }) => {
    const isSuccess = connected === true || connected === 'connected';
    return (
      <div className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border",
        isSuccess 
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
      )}>
        {isSuccess ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {label}
      </div>
    );
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse mb-8">
          <Activity className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter mb-2">{t.title}</h1>
        <p className="text-muted-foreground font-bold animate-pulse">
          Se verifică integritatea serviciilor...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Header section with theme background */}
      <div className="bg-background border-b border-border/50 pt-12 pb-16 px-6 lg:px-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity className="w-64 h-64" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {t.title} v{data?.version}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4 italic">
                Sănătate <span className="text-primary">Servicii</span>
              </h1>
              <p className="text-xl text-muted-foreground font-semibold max-w-2xl">
                {t.subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                onClick={() => setRefreshCount(c => c + 1)} 
                variant="outline" 
                className="rounded-2xl font-black gap-2 h-14 px-6 border-border/50 bg-background/50 hover:bg-background"
                disabled={loading}
              >
                <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
                {t.refresh}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12">
        {error && (
          <div className="mb-8 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex items-center gap-4 text-rose-500">
            <AlertCircle className="w-8 h-8" />
            <div>
              <p className="font-black text-lg">Eroare de Monitorizare</p>
              <p className="font-bold opacity-80">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Uptime Card */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">{t.uptime}</h3>
              <Clock className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-4">{data ? formatUptime(data.uptime) : '0z 0o 0m'}</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Disponibilitate API</span>
                  <span className="text-emerald-500">99.9%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[99.9%] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Card */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">{t.memory}</h3>
              <Cpu className="w-5 h-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-4">{data ? formatMemory(data.memoryUsage.rss) : '0.00 MB'}</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Heap Used</span>
                  <span className="text-muted-foreground">{data ? formatMemory(data.memoryUsage.heapUsed) : '0 MB'}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-1000 ease-out" 
                    style={{ width: data ? `${(data.memoryUsage.heapUsed / data.memoryUsage.heapTotal) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Card */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">{t.services.title}</h3>
              <Server className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black leading-none mb-1">Vercel Edge</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{data?.services.vercel.environment || 'Local'}</p>
                    </div>
                  </div>
                  <StatusBadge 
                    connected={data?.services.vercel.connected || false} 
                    label={data?.services.vercel.connected ? t.services.connected : t.services.disconnected} 
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black leading-none mb-1">Supabase DB</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">PostgreSQL</p>
                    </div>
                  </div>
                  <StatusBadge 
                    connected={data?.services.supabase.status || 'disconnected'} 
                    label={data?.services.supabase.status === 'connected' ? t.services.connected : 'Eroare'} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Links / Monitoring */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-black tracking-tight">Instrumente de Monitorizare</h3>
                </div>
                <p className="text-muted-foreground font-semibold">Acces direct la platformele de gestionare.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    href={data?.monitoring.vercelDashboard || '#'} 
                    target="_blank"
                    className="group p-6 rounded-3xl bg-muted/50 border border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-lg font-black leading-none mb-2">Vercel Console</p>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Deployment & Logs</p>
                  </Link>

                  <Link 
                    href={data?.monitoring.supabaseDashboard || '#'} 
                    target="_blank"
                    className="group p-6 rounded-3xl bg-muted/50 border border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Database className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-lg font-black leading-none mb-2">Supabase Manager</p>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Auth & Database</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 rounded-[40px] bg-primary text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                  <ShieldCheck className="absolute -bottom-8 -right-8 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <h3 className="text-2xl font-black tracking-tighter mb-4">Securitate & Integritate</h3>
                  <p className="text-white/80 font-bold mb-6">Sistemul este protejat prin SSL/TLS și autentificare delegată către Supabase Auth.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">SSL Activ</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">CORS Protejat</span>
                  </div>
               </div>

               <div className="p-8 rounded-[40px] bg-background border border-border/50 shadow-xl relative overflow-hidden group">
                  <Activity className="absolute -bottom-8 -right-8 w-40 h-40 text-primary opacity-5 group-hover:scale-110 transition-transform duration-700" />
                  <h3 className="text-2xl font-black tracking-tighter mb-4">Raportează o Problemă</h3>
                  <p className="text-muted-foreground font-bold mb-6">Ai observat o eroare sau un comportament neașteptat?</p>
                  <Button className="w-full rounded-2xl font-black gap-2 h-14 shadow-lg shadow-primary/20">
                    Deschide Tichet Suport
                    <ChevronRight className="w-4 h-4" />
                  </Button>
               </div>
            </div>
          </div>

          {/* Sidebar - Useful Links */}
          <div className="space-y-8">
            <h3 className="text-xl font-black tracking-tight px-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Link-uri Utile
            </h3>
            <div className="space-y-4">
              {USEFUL_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.url} 
                  target="_blank"
                  className="block p-6 rounded-3xl bg-background border border-border/50 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-black tracking-tight">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground font-semibold">{link.description}</p>
                </Link>
              ))}
            </div>

            <Card className="bg-muted/30 border-dashed">
              <CardContent className="pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Monitorizare Activă</span>
                </div>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed">
                  Acest sistem de diagnoză este utilizat pentru a asigura transparența serviciilor digitale oferite de Comuna Bârnova. Datele sunt reîmprospătate la fiecare încărcare a paginii.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
