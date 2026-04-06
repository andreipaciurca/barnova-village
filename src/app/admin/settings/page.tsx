import { getServerService } from '@/lib/supabase/services.server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { ComponentType } from 'react'
import {
  AlertCircle,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Globe,
  LayoutDashboard,
  Settings,
  Save,
} from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AdminShell } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const params = await searchParams
  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const generalSettings = await service.getSettings('general')
  const featureSettings = await service.getSettings('features')

  type FeatureCard = {
    key: string
    label: string
    description: string
    checked: boolean
    icon: ComponentType<{ className?: string }>
    accent?: boolean
  }

  async function updateGeneralAction(formData: FormData) {
    'use server'
    const service = await getServerService()
    const site_name = formData.get('site_name') as string
    const site_description = formData.get('site_description') as string
    const contact_email = formData.get('contact_email') as string

    const result = await service.updateSettings('general', {
      site_name,
      site_description,
      contact_email,
    })

    if (!result.error) {
      revalidatePath('/admin/settings')
      redirect('/admin/settings?success=true')
    } else {
      redirect('/admin/settings?error=true')
    }
  }

  async function updateFeaturesAction(formData: FormData) {
    'use server'
    const service = await getServerService()
    const show_news = formData.get('show_news') === 'on'
    const show_stats = formData.get('show_stats') === 'on'
    const show_weather = formData.get('show_weather') === 'on'
    const sarcastic_mode = formData.get('sarcastic_mode') === 'on'

    const result = await service.updateSettings('features', {
      show_news,
      show_stats,
      show_weather,
      sarcastic_mode,
    })

    if (!result.error) {
      revalidatePath('/admin/settings')
      redirect('/admin/settings?success=true')
    } else {
      redirect('/admin/settings?error=true')
    }
  }

  const featureCards: FeatureCard[] = [
    {
      key: 'show_news',
      label: 'Afișează știri',
      description: 'Controlează secțiunea de anunțuri de pe homepage.',
      checked: featureSettings.show_news,
      icon: FileText,
    },
    {
      key: 'show_stats',
      label: 'Afișează statistici',
      description: 'Include modulele de cifre și infografice din pagina principală.',
      checked: featureSettings.show_stats,
      icon: LayoutDashboard,
    },
    {
      key: 'show_weather',
      label: 'Afișează vremea',
      description: 'Arată widget-ul meteo doar când ai nevoie de el.',
      checked: featureSettings.show_weather,
      icon: Globe,
    },
    {
      key: 'sarcastic_mode',
      label: 'Mod sarcastic',
      description: 'Activează tonul neoficial al portalului demo.',
      checked: featureSettings.sarcastic_mode,
      icon: AlertCircle,
      accent: true,
    },
  ]

  return (
    <AdminShell
      section="settings"
      title="Setări site"
      subtitle="Gestionează identitatea portalului, funcționalitățile active și comportamentul de afișare al homepage-ului."
      userEmail={user.email || undefined}
      actions={
        <Link href="/admin/dashboard">
          <Button variant="outline" className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {params.success ? (
          <Card className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-700 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-bold">Setările au fost salvate cu succes.</p>
            </div>
          </Card>
        ) : null}

        {params.error ? (
          <Card className="rounded-[2rem] border border-destructive/20 bg-destructive/10 p-5 text-destructive shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <p className="font-bold">A apărut o eroare la salvarea setărilor.</p>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">General settings</p>
                <h3 className="text-xl font-black tracking-tight">Identitate site</h3>
              </div>
            </div>

            <form action={updateGeneralAction} className="space-y-6">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Nume site
                </label>
                <input
                  name="site_name"
                  type="text"
                  defaultValue={generalSettings.site_name}
                  className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 font-bold outline-none transition-all focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Descriere site
                </label>
                <textarea
                  name="site_description"
                  defaultValue={generalSettings.site_description}
                  rows={4}
                  className="w-full rounded-[1.75rem] border border-border/60 bg-muted/30 px-6 py-4 font-medium outline-none transition-all focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Email contact
                </label>
                <input
                  name="contact_email"
                  type="email"
                  defaultValue={generalSettings.contact_email}
                  className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 font-bold outline-none transition-all focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                  required
                />
              </div>

              <Button type="submit" className="h-16 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                <Save className="mr-2 h-5 w-5" />
                Salvează identitatea
              </Button>
            </form>
          </Card>

          <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Feature flags</p>
                <h3 className="text-xl font-black tracking-tight">Funcționalități active</h3>
              </div>
            </div>

            <form action={updateFeaturesAction} className="space-y-4">
              {featureCards.map((feature) => (
                <label
                  key={feature.key}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all hover:bg-muted/35"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={
                        feature.accent
                          ? 'flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600'
                          : 'flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary'
                      }
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{feature.label}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <input
                    name={feature.key}
                    type="checkbox"
                    defaultChecked={feature.checked}
                    className="h-6 w-6 rounded-lg border-border text-primary focus:ring-primary"
                  />
                </label>
              ))}

              <Button type="submit" className="h-16 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                <Save className="mr-2 h-5 w-5" />
                Salvează setările
              </Button>
            </form>

            <div className="mt-6 rounded-[1.5rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Admin note</div>
              <p className="text-sm leading-7 text-muted-foreground">
                Schimbările de aici se propagă direct în homepage, inclusiv în secțiunea de anunțuri și în modul
                vizual al portalului.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
