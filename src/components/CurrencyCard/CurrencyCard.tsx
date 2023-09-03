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

function formatNumber(num: string) {
  // format number 1000000 to 1,234,567
  return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatCurrency(value: string, blur?: boolean) {
  // don't validate empty input
  if (value === '') {
    return ''
  }

  // check for decimal
  if (value.indexOf('.') >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    const decimal_pos = value.indexOf('.')

    // split number by decimal point
    let left_side = value.substring(0, decimal_pos)
    let right_side = value.substring(decimal_pos)

    // add commas to left side of number
    left_side = formatNumber(left_side)

    // validate right side
    right_side = formatNumber(right_side)

    // On blur make sure 2 numbers after decimal
    if (blur) {
      right_side += '00'
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2)

    // join number by .
    return left_side + '.' + right_side
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    let result = formatNumber(value)

    // final formatting
    if (blur) {
      result += '.00'
    }

    return result
  }
}

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
            value={formatCurrency(value)}
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
