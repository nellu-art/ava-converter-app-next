'use client'
import { CurrencyCard } from '@/components/CurrencyCard/CurrencyCard'
import { Header } from '@/components/Header/Header'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-12 relative">
      <div className="absolute top-0 left-0 w-full">
        <Header
          isMenuOpen={isMenuOpen}
          onMenuOpenClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>

      <div className="max-w-5xl w-full items-center font-mono text-sm flex justify-center">
        <CurrencyCard currency="USD" value={value} onChange={setValue} />
      </div>
    </main>
  )
}
