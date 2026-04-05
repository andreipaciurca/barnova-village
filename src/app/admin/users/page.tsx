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
  Globe,
  PlusCircle,
  Pencil,
  Trash2,
  Calendar,
  LayoutDashboard,
  Activity,
  Zap,
  ExternalLink,
  ChevronLeft,
  UserCheck,
  Mail,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { translations, Language } from '@/lib/i18n'
import { AdminLanguageToggle } from '@/components/ui/AdminLanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; success?: string; error?: string }>
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

  async function updateProfileAction(formData: FormData) {
    'use server'
    const service = await getServerService()
    const full_name = formData.get('full_name') as string
    
    // În Supabase Auth, putem actualiza metadatele utilizatorului curent
    const { error } = await service.client.auth.updateUser({
      data: { full_name }
    })

    if (!error) {
      revalidatePath('/admin/users')
      redirect(`/admin/users?lang=${lang}&success=true`)
    } else {
      redirect(`/admin/users?lang=${lang}&error=true`)
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

        {params.success && (
          <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center gap-4 text-emerald-600 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-bold">{lang === 'ro' ? 'Profil actualizat cu succes!' : 'Profile updated successfully!'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <Card className="xl:col-span-1 rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
              <UsersIcon className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-1">{user.user_metadata?.full_name || user.email?.split('@')[0]}</h3>
            <p className="text-sm font-black text-primary uppercase tracking-widest mb-8">{navT.admin_tag}</p>
            
            <div className="w-full space-y-4 text-left">
              <div className="p-4 rounded-2xl bg-muted/30 flex items-center gap-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.email}</p>
                  <p className="font-bold truncate">{user.email}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 flex items-center gap-4">
                <UserCheck className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.role}</p>
                  <p className="font-bold">{navT.admin_tag}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 flex items-center gap-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t.last_login}</p>
                  <p className="font-bold text-sm">
                    {new Date(user.last_sign_in_at || '').toLocaleString(lang === 'ro' ? 'ro-RO' : 'en-US')}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Edit Profile Form */}
          <Card className="xl:col-span-2 rounded-[3rem] border-none shadow-2xl shadow-primary/5 p-10 bg-background">
            <h3 className="text-2xl font-black tracking-tight mb-8">{lang === 'ro' ? 'Editează Profil' : 'Edit Profile'}</h3>
            <form action={updateProfileAction} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">
                  {lang === 'ro' ? 'Nume Complet' : 'Full Name'}
                </label>
                <input 
                  name="full_name"
                  type="text" 
                  defaultValue={user.user_metadata?.full_name || ''}
                  placeholder="ex: Andrei Alexandru"
                  className="w-full bg-muted/30 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">{t.email}</label>
                <input 
                  type="email" 
                  value={user.email}
                  disabled
                  className="w-full bg-muted/10 border-none rounded-2xl px-6 py-4 font-bold text-muted-foreground cursor-not-allowed"
                />
                <p className="text-[10px] text-muted-foreground ml-4 font-bold italic">
                  {lang === 'ro' ? '* Email-ul nu poate fi modificat pentru conturile administrative.' : '* Email cannot be changed for administrative accounts.'}
                </p>
              </div>
              <Button type="submit" className="w-full rounded-2xl h-14 font-black gap-2 shadow-xl shadow-primary/10">
                <Save className="w-5 h-5" />
                {lang === 'ro' ? 'Salvează Profilul' : 'Save Profile'}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
