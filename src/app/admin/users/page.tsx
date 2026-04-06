import { getServerService } from '@/lib/supabase/services.server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft,
  Clock,
  Mail,
  Save,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users as UsersIcon,
} from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AdminShell } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({
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

  async function updateProfileAction(formData: FormData) {
    'use server'
    const service = await getServerService()
    const full_name = formData.get('full_name') as string

    const { error } = await service.client.auth.updateUser({
      data: { full_name },
    })

    if (!error) {
      revalidatePath('/admin/users')
      redirect('/admin/users?success=true')
    } else {
      redirect('/admin/users?error=true')
    }
  }

  const initials = (user.user_metadata?.full_name || user.email || 'B')
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <AdminShell
      section="users"
      title="Utilizatori & acces"
      subtitle="Gestionează profilul curent și păstrează un control clar asupra conturilor administrative."
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
              <Sparkles className="h-5 w-5" />
              <p className="font-bold">Profil actualizat cu succes.</p>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[0.85fr_minmax(0,1.15fr)]">
          <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-primary/10 text-2xl font-black text-primary">
                {initials}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Current user</p>
                <h3 className="text-2xl font-black tracking-tight">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Administrator'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Cont cu acces administrativ</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">{'Email'}</p>
                    <p className="font-bold">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Rol</p>
                    <p className="font-bold">Administrator</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Ultima autentificare</p>
                    <p className="font-bold">
                      {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ro-RO') : 'Nespecificat'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Access tier</p>
                    <p className="font-bold">Protected admin session</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <UsersIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Profile editor</p>
                <h3 className="text-xl font-black tracking-tight">Editează profilul</h3>
              </div>
            </div>

            {params.error ? (
              <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
                Nu am putut salva profilul.
              </div>
            ) : null}

            <form action={updateProfileAction} className="space-y-6">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Nume complet
                </label>
                <input
                  name="full_name"
                  type="text"
                  defaultValue={user.user_metadata?.full_name || ''}
                  placeholder="ex: Andrei Alexandru"
                  className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 font-bold outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-border/60 bg-muted/10 px-6 py-4 font-bold text-muted-foreground"
                />
                <p className="ml-1 text-xs text-muted-foreground">
                  Email-ul rămâne blocat pentru siguranța conturilor administrative.
                </p>
              </div>

              <Button type="submit" className="h-16 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                <Save className="mr-2 h-5 w-5" />
                Salvează profilul
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
