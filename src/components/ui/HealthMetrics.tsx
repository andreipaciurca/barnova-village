'use client';

import React, { useEffect, useState } from 'react';
import { translations } from '@/lib/i18n';
import { Activity, Database, Zap } from 'lucide-react';
import { Card } from './Card';

export function HealthMetrics() {
  const [data, setData] = useState<any>(null);
  const t = translations.ro.admin.dashboard.stats;

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <Card className="p-6 border-none shadow-xl shadow-blue-500/5 bg-background/50 backdrop-blur-xl group hover:shadow-blue-500/10 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.active_posts}</p>
            <p className="text-3xl font-black">{data?.postsCount ?? '...'}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-xl shadow-emerald-500/5 bg-background/50 backdrop-blur-xl group hover:shadow-emerald-500/10 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.system_health}</p>
            <p className="text-3xl font-black">{data?.status === 'UP' ? t.status_active : '...'}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-xl shadow-amber-500/5 bg-background/50 backdrop-blur-xl group hover:shadow-amber-500/10 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.visitors}</p>
            <p className="text-3xl font-black">342</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
