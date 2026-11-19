import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Courier_Prime, Oswald } from 'next/font/google'
import './globals.css'

const courier = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-courier' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'Saint Village 1934 · A Cidade da Neblina',
  description:
    'Um RPG investigativo solo ao estilo film noir. Monte seu investigador, abra um caso e enfrente Saint Village com um narrador de IA, um dado de seis faces e a sua consciência.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#121214',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${courier.variable} ${oswald.variable} bg-background`}>
      <body className="grain antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
