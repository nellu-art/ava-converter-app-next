'use client'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'
import { useMaskito } from '@maskito/react'

type CurrencyCardProps = {
  currency: string
  value: string
  onChange: (newValue: string) => void
}

const options = maskitoNumberOptionsGenerator({
  decimalZeroPadding: true,
  precision: 2,
  decimalSeparator: '.',
  thousandSeparator: ',',
  min: 0,
})

export const CurrencyCard = ({
  currency,
  value,
  onChange,
}: CurrencyCardProps) => {
  const inputRef = useMaskito({ options })

  return (
    <div className="rounded shadow-lg p-3 bg-gray-900">
      <div className="flex items-center border-b border-sky-700 text-slate-300">
        <p>{currency}</p>
        <input
          ref={inputRef}
          className="appearance-none bg-transparent border-none w-full text-inherit py-1 px-2 leading-tight focus:outline-none"
          placeholder="0.00"
          value={value}
          onInput={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}
