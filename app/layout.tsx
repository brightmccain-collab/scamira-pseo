import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buy Gold Worldwide with Cryptocurrency | Dubai & Cairo Delivery',
  description: 'Premium gold delivered worldwide using Bitcoin, Ethereum, and cryptocurrencies. Fast delivery from Dubai & Cairo. Trusted global gold dealer.',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
