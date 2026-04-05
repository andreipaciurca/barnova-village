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
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch posts count or real data
  const posts = await service.getAllPosts()
  
  const stats = [
    { label: 'Postări Active', value: posts.length.toString(), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Sănătate Sistem', value: 'Activ', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Vizitatori Azi', value: '342', icon: BarChart, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="min-h-screen bg-muted/10 flex">
      {/* Sidebar */}
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
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 text-primary font-black transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/posts" className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <FileText className="w-5 h-5" />
            Postări & Știri
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <UsersIcon className="w-5 h-5" />
            Utilizatori
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground font-bold transition-all">
            <Settings className="w-5 h-5" />
            Setări Site
          </Link>
        </nav>

        <div className="pt-8 border-t border-border/50">
          <div className="flex items-center gap-4 px-4 py-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <UsersIcon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate">{user.email}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Administrator</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="outline" className="w-full rounded-2xl font-black gap-2 h-12 text-destructive border-destructive/20 hover:bg-destructive/10">
              <LogOut className="w-4 h-4" />
              Ieșire
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2">Bună dimineața!</h2>
            <p className="text-muted-foreground font-semibold">Iată ce se întâmplă astăzi în comuna Bârnova.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="rounded-2xl font-black gap-2 h-14 px-6 border-border/50 bg-background/50">
                <Globe className="w-5 h-5" />
                Vezi Site
              </Button>
            </Link>
            <Link href="/admin/posts/new">
              <Button className="rounded-2xl font-black gap-2 h-14 px-8 shadow-xl shadow-primary/20">
                <PlusCircle className="w-5 h-5" />
                Postare Nouă
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-primary/5 bg-background relative overflow-hidden group">
              <div className={cn("absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity", stat.color)}>
                <stat.icon className="w-16 h-16" />
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-4xl font-black mb-1">{stat.value}</div>
              <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </Card>
          ))}
        </div>

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
              <h3 className="text-2xl font-black tracking-tight">Postări Recente</h3>
              <Link href="/admin/posts" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
                Vezi toate
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
                  {[
                    { title: 'Modernizare Școala Bârnova', status: 'Publicat', date: 'Acum 2 ore' },
                    { title: 'Proiect Canalizare Etapa 2', status: 'Draft', date: 'Ieri' },
                    { title: 'Festivalul Tradițiilor Locale', status: 'Publicat', date: '3 Apr 2026' },
                  ].map((post, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="px-10 py-6 font-bold">{post.title}</td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          post.status === 'Publicat' ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                        )}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-sm text-muted-foreground font-medium">{post.date}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-border/50">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-border/50 text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

