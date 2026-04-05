import { translations, Language } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function NotFound() {
  // We don't have easy access to lang here without complex logic, defaulting to 'ro'
  const t = translations.ro;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="relative">
          <h1 className="text-[12rem] font-black text-primary/10 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-black text-foreground">Ups! Pagina lipsește</h2>
          </div>
        </div>
        
        <p className="text-muted-foreground text-lg">
          Se pare că drumul pe care l-ai ales nu există în portalul nostru digital.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              Înapoi la Acasă
            </Button>
          </Link>
          <Link href="/?lang=en" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Switch to English
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
