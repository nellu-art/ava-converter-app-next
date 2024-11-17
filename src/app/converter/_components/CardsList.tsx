'use client'
import {
  CurrencyCard,
  getNumberFromInputValue,
} from '@/components/CurrencyCard/CurrencyCard'
import { useReducer } from 'react'
import useSWR from 'swr'

type CardsListProps = {
  selectedCurrencies: string[]
}

type State = {
  currentValues: Record<CurrencyName, string>
  initialRates: Record<CurrencyName, string>
}
type CurrencyName = string
type Action = {
  type: 'UPDATE_CURRENCY_VALUE'
  payload: { currency: CurrencyName; value: string }
}

function currentValuesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_CURRENCY_VALUE':
      const { currency, value } = action.payload

      const nextValue = getNumberFromInputValue(value)

      if (nextValue >= Number.MAX_SAFE_INTEGER) {
        return state
      }

      const initialRate = Number(state.initialRates[currency])
      const updatedRate = nextValue / initialRate

      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          ...Object.entries(state.initialRates).reduce(
            (acc, [key, initialRate]) => {
              if (key === currency) return acc

              return {
                ...acc,
                [key]: (Number(initialRate) * updatedRate).toFixed(2),
              }
            },
            { [currency]: value }
          ),
        },
      }
    default:
      return state
  }
}

function mapRatesToState(rates: Array<{ name: CurrencyName; value: number }>) {
  return rates.reduce<Record<CurrencyName, string>>(
    (result, currency) => ({
      ...result,
      [currency.name]: Number(currency.value).toFixed(2),
    }),
    {}
  )
}

const InternalCardsList = ({
  currenciesRates,
}: {
  currenciesRates: Array<{ name: CurrencyName; value: number }>
}) => {
  const [state, dispatch] = useReducer(currentValuesReducer, {
    currentValues: mapRatesToState(currenciesRates),
    initialRates: mapRatesToState(currenciesRates),
  })

  return (
    <div className="p-18 pb-2">
      {currenciesRates.map((currency) => {
        return (
          <div key={currency.name} className="mb-4">
            <CurrencyCard
              currency={currency.name}
              value={state.currentValues[currency.name] ?? ''}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_CURRENCY_VALUE',
                  payload: {
                    currency: currency.name,
                    value,
                  },
                })
              }
            />
          </div>
        )
      })}
    </div>
  )
}

const RATES_UPDATED_ON = 'Rates updated on'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const CardsList = ({ selectedCurrencies }: CardsListProps) => {
  const { data: { data } = {}, isLoading } = useSWR(`/api/rates`, fetcher)

  if (isLoading) {
    return (
      <div className="text-center">
        <p className="font-medium">Loading...</p>
      </div>
    )
  }

  const { currencies, updatedAt } = extractDataFromResponse(data)

  const filteredCurrencies = currencies.filter((currency: { name: string }) =>
    selectedCurrencies.includes(currency.name)
  )

  return (
    <div className="flex flex-col h-full">
      {updatedAt ? (
        <p className="px-18 py-4 font-medium text-base">{`${RATES_UPDATED_ON} ${formatDateToLabel(
          updatedAt
        )}`}</p>
      ) : null}

      <div className="flex-1 overflow-auto">
        <InternalCardsList
          key={filteredCurrencies.join(',')}
          currenciesRates={filteredCurrencies}
        />
      </div>
    </div>
  )
}

function extractDataFromResponse(data: Record<string, unknown>) {
  let currencies: Array<{ name: string; value: number }> = []
  let updatedAt: Date | null = null
  if ('records' in data && Array.isArray(data.records)) {
    const record = data.records[0]

    if (typeof record === 'object' && 'currencies' in record) {
      currencies = record.currencies
    }

    if (typeof record === 'object' && 'updatedAt' in record) {
      updatedAt = new Date(record.updatedAt as string)
    }
  }

  return { currencies, updatedAt }
}

function formatDateToLabel(date: Date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  })

  return `${day}.${month} at ${time}`
}
