import { getServerService } from '@/lib/supabase/services.server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Plus, 
  Settings, 
  FileText, 
  Users as UsersIcon, 
  LogOut, 
  BarChart, 
  Globe,
  PlusCircle,
  Pencil,
  Trash2,
  Calendar,
  LayoutDashboard,
  Activity,
  Zap,
  ExternalLink,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { translations, Language } from '@/lib/i18n'
import { AdminLanguageToggle } from '@/components/ui/AdminLanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = (params.lang === 'en' ? 'en' : 'ro') as Language
  const t = translations[lang].admin.users
  const navT = translations[lang].admin.dashboard.sidebar

  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect(`/admin/login?lang=${lang}`)
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
          <Link href={`/admin/dashboard?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <LayoutDashboard className="w-5 h-5" />
            {navT.dashboard}
          </Link>
          <Link href={`/admin/posts?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <FileText className="w-5 h-5" />
            {navT.posts}
          </Link>
          <Link href={`/admin/users?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 text-primary font-black transition-all">
            <UsersIcon className="w-5 h-5" />
            {navT.users}
          </Link>
          <Link href={`/admin/settings?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <Settings className="w-5 h-5" />
            {navT.settings}
          </Link>
        </nav>

        <div className="pt-8 border-t border-border/50 space-y-6">
          <div className="flex items-center gap-4">
            <AdminLanguageToggle currentLang={lang} />
            <ThemeToggle />
          </div>
          
          <div className="flex items-center gap-4 px-4 py-4 bg-muted/30 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <UsersIcon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate">{user.email}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{navT.admin_tag}</p>
            </div>
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
            <div className="flex items-center gap-4 mb-4 lg:hidden">
              <AdminLanguageToggle currentLang={lang} />
              <ThemeToggle />
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-2">{t.title}</h2>
            <p className="text-muted-foreground font-semibold">{t.subtitle}</p>
          </div>
          <Link href={`/admin/dashboard?lang=${lang}`}>
            <Button variant="outline" className="rounded-2xl font-black gap-2 h-14 px-6 border-border/50 bg-background/50">
              <ChevronLeft className="w-5 h-5" />
              {t.back}
            </Button>
          </Link>
        </header>

        <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 overflow-hidden bg-background">
          <div className="p-10 border-b border-border/50">
            <h3 className="text-2xl font-black tracking-tight">{t.current_user}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.email}</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.role}</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.last_login}</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-10 py-6 font-bold">{user.email}</td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                      {navT.admin_tag}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm text-muted-foreground font-medium">
                    {new Date(user.last_sign_in_at || '').toLocaleString(lang === 'ro' ? 'ro-RO' : 'en-US')}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-border/50" disabled>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
