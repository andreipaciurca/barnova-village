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
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { translations, Language } from '@/lib/i18n'
import { DynamicGreeting } from '@/components/ui/DynamicGreeting'
import { HealthMetrics } from '@/components/ui/HealthMetrics'
import { AdminLanguageToggle } from '@/components/ui/AdminLanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = (params.lang === 'en' ? 'en' : 'ro') as Language
  const t = translations[lang].admin.dashboard
  const navT = t.sidebar

  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect(`/admin/login?lang=${lang}`)
  }

  const posts = await service.getAllPosts()
  
  return (
    <div className="min-h-screen bg-muted/10 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-80 bg-background border-r border-border/50 p-8 flex flex-col hidden lg:flex h-screen sticky top-0">
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
          <Link href={`/admin/dashboard?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 text-primary font-black transition-all">
            <LayoutDashboard className="w-5 h-5" />
            {navT.dashboard}
          </Link>
          <Link href={`/admin/posts?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <FileText className="w-5 h-5" />
            {navT.posts}
          </Link>
          <Link href={`/admin/users?lang=${lang}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
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

      {/* Mobile Header */}
      <header className="lg:hidden bg-background border-b border-border/50 p-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-black">B</div>
          <span className="font-black tracking-tighter">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <AdminLanguageToggle currentLang={lang} />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <DynamicGreeting lang={lang} />
            <p className="text-muted-foreground font-semibold">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/?lang=${lang}`}>
              <Button variant="outline" className="rounded-2xl font-black gap-2 h-14 px-6 border-border/50 bg-background/50">
                <Globe className="w-5 h-5" />
                {t.view_site}
              </Button>
            </Link>
            <Link href={`/admin/posts/new?lang=${lang}`}>
              <Button className="rounded-2xl font-black gap-2 h-14 px-8 shadow-xl shadow-primary/20">
                <PlusCircle className="w-5 h-5" />
                {t.new_post}
              </Button>
            </Link>
          </div>
        </header>

        {/* Health Stats */}
        <HealthMetrics lang={lang} />

        {/* Logs & Monitoring Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background overflow-hidden relative">
             <div className="absolute top-0 right-0 p-10 opacity-5">
              <Zap className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-8">Monitorizare & Log-uri</h3>
            <div className="space-y-4">
              <a 
                href="https://vercel.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Vercel Logs</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Serverless Functions & Deployment</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Supabase Logs</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Database & Auth Activity</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background flex flex-col justify-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Activity className="w-10 h-10 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">Endpoint Sănătate</h3>
            <p className="text-muted-foreground font-semibold mb-8 max-w-sm mx-auto">
              Sistemul verifică automat conexiunea cu baza de date și statusul serverului.
            </p>
            <Link href="/api/health" target="_blank">
              <Button variant="outline" className="rounded-2xl font-black gap-2 h-14 px-8 border-border/50">
                Vezi Status JSON
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Recent Activity / Content Table */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 overflow-hidden bg-background">
            <div className="p-10 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-tight">{t.recent_posts.title}</h3>
              <Link href={`/admin/posts?lang=${lang}`} className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
                {t.recent_posts.view_all}
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Titlu</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dată</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-12 text-center text-muted-foreground font-bold italic">
                        {t.recent_posts.empty}
                      </td>
                    </tr>
                  ) : (
                    posts.slice(0, 5).map((post, idx) => (
                      <tr key={idx} className="hover:bg-muted/20 transition-colors">
                        <td className="px-10 py-6 font-bold">{post.title}</td>
                        <td className="px-10 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            post.is_published ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                          )}>
                            {post.is_published ? 'Publicat' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-sm text-muted-foreground font-medium">
                          {new Date(post.created_at).toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-US')}
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/posts/${post.id}?lang=${lang}`}>
                              <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-border/50">
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

