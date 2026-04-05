'use client'

import { useState } from 'react'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { Mail, AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const authService = getBrowserService()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await authService.signInWithOtp(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md rounded-[2.5rem] overflow-hidden border-none shadow-2xl bg-background">
        <CardHeader className="pt-12 pb-8 text-center bg-primary/5">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-primary/20">
            B
          </div>
          <h1 className="text-3xl font-black tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground font-medium">Autentificare securizată prin Magic Link</p>
        </CardHeader>
        
        <CardContent className="p-8">
          {success ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Verifică-ți emailul!</h2>
              <p className="text-muted-foreground font-medium">
                Am trimis un link de autentificare pe <strong>{email}</strong>. 
                Dă click pe link pentru a intra în dashboard.
              </p>
              <Button 
                variant="outline" 
                className="w-full rounded-2xl h-14 font-black"
                onClick={() => setSuccess(false)}
              >
                Încearcă alt email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm font-bold flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Administrativ</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                    placeholder="nume@barnova.ro"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Trimite Link de Acces
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="pb-8 justify-center">
          <button 
            onClick={() => router.push('/')}
            className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            Înapoi la site-ul public
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
