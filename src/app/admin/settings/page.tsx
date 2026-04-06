import { getServerService } from '@/lib/supabase/services.server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Settings, 
  FileText, 
  Users as UsersIcon, 
  LogOut, 
  Globe,
  LayoutDashboard,
  ChevronLeft,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { translations } from '@/lib/i18n'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const params = await searchParams
  const t = translations.ro.admin.settings
  const navT = translations.ro.admin.dashboard.sidebar

  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect(`/admin/login`)
  }

  const generalSettings = await service.getSettings('general')
  const featureSettings = await service.getSettings('features')

  async function updateGeneralAction(formData: FormData) {
    'use server'
    const service = await getServerService()
    const site_name = formData.get('site_name') as string
    const site_description = formData.get('site_description') as string
    const contact_email = formData.get('contact_email') as string
    
    const result = await service.updateSettings('general', {
      site_name,
      site_description,
      contact_email
    })

    if (!result.error) {
      revalidatePath('/admin/settings')
      redirect(`/admin/settings?success=true`)
    } else {
      redirect(`/admin/settings?error=true`)
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
      sarcastic_mode
    })

    if (!result.error) {
      revalidatePath('/admin/settings')
      redirect(`/admin/settings?success=true`)
    } else {
      redirect(`/admin/settings?error=true`)
    }
  }

  return (
    <div className="min-h-screen bg-muted/10 flex">
      {/* Sidebar - Same as Dashboard */}
      <aside className="w-80 bg-background border-r border-border/50 p-8 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary/20">
            B
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">Admin Panel</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Comuna Bârnova</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href={`/admin/dashboard`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" />
            {navT.dashboard}
          </Link>
          <Link href={`/admin/posts`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <FileText className="w-5 h-5" />
            {navT.posts}
          </Link>
          <Link href={`/admin/users`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <UsersIcon className="w-5 h-5" />
            {navT.users}
          </Link>
          <Link href={`/admin/settings`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 text-primary font-black transition-all">
            <Settings className="w-5 h-5" />
            {navT.settings}
          </Link>
        </nav>

        <div className="pt-8 border-t border-border/50 space-y-6">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="outline" className="w-full rounded-2xl font-black gap-2 h-12 text-destructive border-destructive/20 hover:bg-destructive/10">
              <LogOut className="w-4 h-4" />
              {navT.logout}
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2">{t.title}</h2>
            <p className="text-muted-foreground font-semibold">{t.subtitle}</p>
          </div>
          <Link href={`/admin/dashboard`}>
            <Button variant="outline" className="rounded-2xl font-black gap-2 h-14 px-6 border-border/50 bg-background/50">
              <ChevronLeft className="w-5 h-5" />
              {t.back}
            </Button>
          </Link>
        </header>

        {params.success && (
          <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center gap-4 text-emerald-600 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-bold">{t.success}</p>
          </div>
        )}

        {params.error && (
          <div className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-[2rem] flex items-center gap-4 text-destructive animate-in fade-in slide-in-from-top-4 duration-500">
            <AlertCircle className="w-6 h-6" />
            <p className="font-bold">{t.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* General Settings */}
          <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background">
            <h3 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" />
              {t.general.title}
            </h3>
            <form action={updateGeneralAction} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">{t.general.site_name}</label>
                <input 
                  name="site_name"
                  type="text" 
                  defaultValue={generalSettings.site_name}
                  className="w-full bg-muted/30 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">{t.general.site_description}</label>
                <textarea 
                  name="site_description"
                  defaultValue={generalSettings.site_description}
                  rows={3}
                  className="w-full bg-muted/30 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">{t.general.contact_email}</label>
                <input 
                  name="contact_email"
                  type="email" 
                  defaultValue={generalSettings.contact_email}
                  className="w-full bg-muted/30 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-2xl h-14 font-black gap-2 shadow-xl shadow-primary/10">
                <Save className="w-5 h-5" />
                {t.save}
              </Button>
            </form>
          </Card>

          {/* Feature Toggles */}
          <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background">
            <h3 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              {t.features.title}
            </h3>
            <form action={updateFeaturesAction} className="space-y-8">
              <div className="space-y-4">
                <label className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{t.features.show_news}</span>
                  </div>
                  <input 
                    name="show_news"
                    type="checkbox" 
                    defaultChecked={featureSettings.show_news}
                    className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-none bg-muted-foreground/20"
                  />
                </label>

                <label className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{t.features.show_stats}</span>
                  </div>
                  <input 
                    name="show_stats"
                    type="checkbox" 
                    defaultChecked={featureSettings.show_stats}
                    className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-none bg-muted-foreground/20"
                  />
                </label>

                <label className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{t.features.show_weather}</span>
                  </div>
                  <input 
                    name="show_weather"
                    type="checkbox" 
                    defaultChecked={featureSettings.show_weather}
                    className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-none bg-muted-foreground/20"
                  />
                </label>

                <label className="flex items-center justify-between p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-orange-700">{t.features.sarcastic_mode}</span>
                  </div>
                  <input 
                    name="sarcastic_mode"
                    type="checkbox" 
                    defaultChecked={featureSettings.sarcastic_mode}
                    className="w-6 h-6 rounded-lg text-orange-600 focus:ring-orange-500 border-none bg-orange-500/20"
                  />
                </label>
              </div>

              <Button type="submit" className="w-full rounded-2xl h-14 font-black gap-2 shadow-xl shadow-primary/10">
                <Save className="w-5 h-5" />
                {t.save}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
