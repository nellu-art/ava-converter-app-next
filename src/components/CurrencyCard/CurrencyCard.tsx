'use client'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'
import { useMaskito } from '@maskito/react'
import { useLayoutEffect, useRef } from 'react'

import './style.css'
import { formatCurrency } from './helpers/formatCurrency'

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
  const inputRef = useRef<HTMLInputElement | null>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const maskInputRef = useMaskito({ options })
  const animationBoxRef = useRef<HTMLDivElement>(null)

  const adjustInputWidth = () => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent =
        inputRef.current.value || inputRef.current.placeholder
      inputRef.current.style.width = `${spanRef.current.offsetWidth}px`
    }
  }

  useLayoutEffect(() => {
    adjustInputWidth()
  }, [value])

  return (
    <div
      className="animation-box bg-opacity3"
      ref={animationBoxRef}
      onClick={() => inputRef.current?.focus()}
    >
      <span />
      <span />
      <span />
      <span />
      <div className="p-5">
        <div className="flex items-center justify-between text-2xl">
          <p className="pr-5 font-rammetto">{currency}</p>
          <div className="flex-1 overflow-hidden">
            <div className="relative flex justify-end font-miriam text-3xl">
              <input
                ref={(input) => {
                  inputRef.current = input
                  maskInputRef(input)
                }}
                type="tel"
                className="appearance-none bg-transparent border-none text-inherit py-1 px-2 leading-tight focus:outline-none input-expandable"
                placeholder="0.00"
                value={formatCurrency(value)}
                onInput={(e) => {
                  const number = getNumberFromInputValue(e.currentTarget.value)
                  if (number >= Number.MAX_SAFE_INTEGER) {
                    e.currentTarget.value = formatCurrency(value)
                    return
                  }
                  onChange(e.currentTarget.value)
                }}
                onFocus={(e) => {
                  animationBoxRef.current?.classList.add('active')
                  const number = getNumberFromInputValue(e.currentTarget.value)
                  if (number >= Number.MAX_SAFE_INTEGER) {
                    const maxFormattedValue = findMaxValidValue(value)
                    onChange(formatCurrency(maxFormattedValue.toFixed(2)))
                  }
                }}
                onBlur={() => {
                  animationBoxRef.current?.classList.remove('active')
                  adjustInputWidth()
                }}
              />
              <span
                ref={spanRef}
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  whiteSpace: 'pre',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  padding: '0 2px',
                  left: '0',
                  top: '0',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function getNumberFromInputValue(value: string) {
  return parseFloat(value.replace(/[^0-9.]/g, ''))
}

function findMaxValidValue(value: string) {
  const number = getNumberFromInputValue(value)

  if (number >= Number.MAX_SAFE_INTEGER) {
    return findMaxValidValue((number / 10).toFixed(2))
  }

  return number
}
