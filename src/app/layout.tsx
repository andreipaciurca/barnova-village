import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = {
  metadataBase: new URL('https://barnova.vercel.app'),
  title: {
    default: 'Comuna Bârnova',
    template: '%s · Comuna Bârnova',
  },
  description: 'Portalul digital al Comunei Bârnova - servicii publice, transparență și informații locale actualizate.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Comuna Bârnova',
    description: 'Portalul digital al Comunei Bârnova - servicii publice, transparență și informații locale actualizate.',
    url: 'https://barnova.vercel.app',
    siteName: 'Comuna Bârnova',
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comuna Bârnova',
    description: 'Portalul digital al Comunei Bârnova - servicii publice, transparență și informații locale actualizate.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
