'use client'
import { useSearchParams } from 'next/navigation'
import { HeaderWithMenu } from '@/app/converter/_components/HeaderWithMenu'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CardsList } from '@/app/converter/_components/CardsList'

type ContentProps = {
  supportedCurrencies: { currency: string; country: string }[]
}

export const Content = ({ supportedCurrencies }: ContentProps) => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [selectedCurrencies, setSelectedCurrencies] = useLocalStorage<string[]>(
    'selectedCurrencies',
    []
  )

  if (!token) {
    throw new Error('Token is not provided')
  }

  return (
    <>
      <HeaderWithMenu
        currencies={supportedCurrencies}
        selectedCurrencies={selectedCurrencies}
        onChangeSelectedCurrencies={setSelectedCurrencies}
      />

      <CardsList token={token} selectedCurrencies={selectedCurrencies} />
    </>
  )
}
