'use client'
import { CurrencyCard } from '@/components/CurrencyCard/CurrencyCard'
import { useReducer } from 'react'
import useSWR from 'swr'

type CardsListProps = {
  token: string
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

      const nextValue = Number(value.replace(/,/g, ''))
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
    <div className="h-full overflow-y-auto pr-1">
      {currenciesRates.map((currency) => {
        return (
          <CurrencyCard
            key={currency.name}
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
        )
      })}
    </div>
  )
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const CardsList = ({ token, selectedCurrencies }: CardsListProps) => {
  const { data: { data } = {}, isLoading } = useSWR(
    `/api/rates?token=${token}&currencies=${selectedCurrencies.join(',')}`,
    fetcher
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <InternalCardsList currenciesRates={data.currencies} />
}
