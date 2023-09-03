import { useRef } from 'react'

type CurrencyCheckboxProps = {
  currency: string
  country: string
  isChecked?: boolean
}

const CurrencyCheckbox = ({
  currency,
  country,
  isChecked,
}: CurrencyCheckboxProps) => {
  return (
    <div className="relative flex w-full">
      <label
        htmlFor={currency}
        className="text-xl leading-10 font-medium text-gray-200 select-none flex-1"
      >
        {country} - {currency}
      </label>

      <div className="flex h-10 items-center">
        <input
          id={currency}
          name={currency}
          type="checkbox"
          className="appearance-none h-6 w-6 rounded bg-gray-300 focus:ring-indigo-600 checked:bg-indigo-600"
          defaultChecked={isChecked}
        />
      </div>
    </div>
  )
}

export type CurrenciesSettingsListProps = {
  currencies: CurrencyCheckboxProps[]
  onChange: (selectedCurrencies: string[]) => void
}

export const CurrenciesSettingsList = ({
  currencies,
  onChange,
}: CurrenciesSettingsListProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData.entries())
      onChange(Object.keys(data))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        {currencies.map(({ country, currency, ...rest }, index) => (
          <div
            key={`${country}-${currency}`}
            className={`w-full border-b border-indigo-900 py-5 ${
              index === 0 ? 'border-t' : ''
            }`}
            onClick={() => submitButtonRef.current?.click()}
          >
            <CurrencyCheckbox currency={currency} country={country} {...rest} />
          </div>
        ))}
      </div>
      <button className="hidden" type="submit" ref={submitButtonRef} />
    </form>
  )
}
