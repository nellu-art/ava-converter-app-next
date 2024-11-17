'use client'
import useSWR from 'swr'
import { HeaderWithMenu } from '@/app/converter/_components/HeaderWithMenu'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CardsList } from '@/app/converter/_components/CardsList'
import { useState } from 'react'

const importCurrencies = async () => {
  const { currenciesWithCountry } = await import('@/constants/currencies')
  return currenciesWithCountry
}

export const Content = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useLocalStorage<string[]>(
    'selectedCurrencies',
    ['USD', 'EUR']
  )
  const [paddingTop, setPaddingTop] = useState(0)

  const currenciesWithCountry = useSWR(
    'currenciesWithCountry',
    importCurrencies
  ).data

  if (!currenciesWithCountry) return null

  return (
    <div
      className="max-w-3xl w-full h-full relative"
      style={{
        paddingTop,
      }}
    >
      <HeaderWithMenu
        currencies={currenciesWithCountry}
        selectedCurrencies={selectedCurrencies}
        onChangeSelectedCurrencies={setSelectedCurrencies}
        onMount={setPaddingTop}
      />

      <CardsList selectedCurrencies={selectedCurrencies} />
    </div>
  )
}
