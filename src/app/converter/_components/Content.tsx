'use client'
import { useState } from 'react'
import { HeaderWithMenu } from '@/app/converter/_components/HeaderWithMenu'

type ContentProps = {
  supportedCurrencies: { currency: string; country: string }[]
}

export const Content = ({ supportedCurrencies }: ContentProps) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])

  return (
    <>
      <HeaderWithMenu
        currencies={supportedCurrencies}
        selectedCurrencies={selectedCurrencies}
        onChangeSelectedCurrencies={setSelectedCurrencies}
      />
    </>
  )
}
