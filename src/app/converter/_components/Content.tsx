'use client'
import { HeaderWithMenu } from '@/app/converter/_components/HeaderWithMenu'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CardsList } from '@/app/converter/_components/CardsList'

type ContentProps = {
  supportedCurrencies: { currency: string; country: string }[]
}

export const Content = ({ supportedCurrencies }: ContentProps) => {
  const [selectedCurrencies, setSelectedCurrencies] = useLocalStorage<string[]>(
    'selectedCurrencies',
    ['USD', 'EUR']
  )

  return (
    <>
      <HeaderWithMenu
        currencies={supportedCurrencies}
        selectedCurrencies={selectedCurrencies}
        onChangeSelectedCurrencies={setSelectedCurrencies}
      />

      <CardsList selectedCurrencies={selectedCurrencies} />
    </>
  )
}
