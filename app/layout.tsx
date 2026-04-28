import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Analytics from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gold Investment Hub - Buy Gold with Cryptocurrency',
  description: 'Premium gold investment platform accepting Bitcoin, Ethereum, and cryptocurrencies. Fast delivery from Dubai & Cairo.',
  metadataBase: new URL('https://amiraaldhab.online'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
