'use client';

import { motion } from 'framer-motion';
import { User, Users, Shield, BadgeCheck } from 'lucide-react';
import { Card } from './Card';
import { AdministrationData } from '@/lib/administration';

interface GovernanceSectionProps {
  data: AdministrationData;
  t: any;
}

export function GovernanceSection({ data, t }: GovernanceSectionProps) {
  return (
    <section id="admin" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 grainy-text"
          >
            {t.governance.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t.governance.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mayor Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6 flex items-center gap-6 border-primary/20 bg-primary/5">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Shield size={40} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-1 block">
                  {t.governance.mayor}
                </span>
                <h3 className="text-2xl font-bold mb-1">{data.mayor}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <BadgeCheck size={14} className="text-blue-500" />
                  PNL
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Vice-Mayor Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6 flex items-center gap-6 border-blue-500/20 bg-blue-500/5">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                <User size={40} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500/70 mb-1 block">
                  {t.governance.viceMayor}
                </span>
                <h3 className="text-2xl font-bold mb-1">{data.viceMayor}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <BadgeCheck size={14} className="text-blue-500" />
                  PNL
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Local Council Table/Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold">{t.governance.council}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.councilMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-background/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <BadgeCheck size={14} className="text-blue-500 shrink-0" />
                  {member.name}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {member.party}
                  </span>
                  {member.role && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {member.role}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
