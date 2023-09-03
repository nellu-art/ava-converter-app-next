'use client'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'
import { useMaskito } from '@maskito/react'
import { useRef } from 'react'

import './style.css'

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
  const animationBoxRef = useRef<HTMLDivElement>(null)

  return (
    <div className="animation-box" ref={animationBoxRef}>
      <span />
      <span />
      <span />
      <span />
      <div className="p-3">
        <div className="flex items-center border-b border-zinc-800 text-slate-300">
          <p>{currency}</p>
          <input
            ref={inputRef}
            className="appearance-none bg-transparent border-none w-full text-inherit py-1 px-2 leading-tight focus:outline-none"
            placeholder="0.00"
            value={value}
            onInput={(e) => onChange(e.currentTarget.value)}
            onFocus={() => animationBoxRef.current?.classList.add('active')}
            onBlur={(e) => {
              onChange(e.currentTarget.value)
              animationBoxRef.current?.classList.remove('active')
            }}
          />
        </div>
      </div>
    </div>
  )
}
