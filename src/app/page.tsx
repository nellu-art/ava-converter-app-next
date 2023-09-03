'use client'
import { CurrenciesSettingsList } from '@/components/CurrenciesSettingsList/CurrenciesSettingsList'
import { CurrencyCard } from '@/components/CurrencyCard/CurrencyCard'
import { Header } from '@/components/Header/Header'
import { useState } from 'react'

const dummyCurrencies = [
  { country: 'United States', currency: 'USD' },
  { country: 'United Kingdom', currency: 'GBP' },
  { country: 'European Union', currency: 'EUR' },
  { country: 'Japan', currency: 'JPY' },
  { country: 'Australia', currency: 'AUD' },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [value, setValue] = useState('')
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])

  console.log('selectedCurrencies', selectedCurrencies)

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-12 relative">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col">
        <Header
          isMenuOpen={isMenuOpen}
          onMenuOpenClick={() => setIsMenuOpen((prev) => !prev)}
        />
        <div
          className={`z-10 bg-[rgb(var(--background-rgb))] flex-1 p-6 border-t border-zinc-900  ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <CurrenciesSettingsList
            currencies={dummyCurrencies.map((record) => ({
              ...record,
              isChecked: selectedCurrencies.includes(record.currency),
            }))}
            onChange={setSelectedCurrencies}
          />
        </div>
      </div>

      <div className="max-w-5xl w-full items-center font-mono text-sm flex justify-center">
        <CurrencyCard currency="USD" value={value} onChange={setValue} />
      </div>
    </main>
  )
}
