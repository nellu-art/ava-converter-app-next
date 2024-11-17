import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

const miriamFont = localFont({
  src: [
    {
      path: '../fonts/MiriamLibre/MiriamLibre-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MiriamLibre/MiriamLibre-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/MiriamLibre/MiriamLibre-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/MiriamLibre/MiriamLibre-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-miriam',
})

const rammettoFont = localFont({
  src: '../fonts/RammettoOne/RammettoOne-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-rammetto',
})

export const metadata: Metadata = {
  title: 'AVA Converter',
  description: 'Next generation AVA converter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${miriamFont.variable} ${rammettoFont.variable}`}
    >
      <body className="font-miriam bg-dark">{children}</body>
    </html>
  )
}
