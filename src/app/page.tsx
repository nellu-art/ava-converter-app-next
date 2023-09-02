'use client'
import { CurrencyCard } from '@/components/CurrencyCard/CurrencyCard'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-12">
      <div className="max-w-5xl w-full items-center font-mono text-sm flex justify-center">
        <CurrencyCard currency="USD" value={value} onChange={setValue} />
      </div>
    </main>
  )
}
