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
    <div className="relative flex gap-x-3 w-full border-b border-indigo-900 pb-1">
      <label
        htmlFor={currency}
        className="text-sm leading-6 font-medium text-gray-200 select-none flex-1"
      >
        {country} - {currency}
      </label>

      <div className="flex h-6 items-center">
        <input
          id={currency}
          name={currency}
          type="checkbox"
          className="appearance-none h-4 w-4 rounded bg-gray-300 focus:ring-indigo-600 checked:bg-indigo-600"
          defaultChecked={isChecked}
        />
      </div>
    </div>
  )
}

type CurrenciesSettingsListProps = {
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
      <div className="flex flex-col items-center gap-6">
        {currencies.map(({ country, currency, ...rest }) => (
          <div
            key={`${country}-${currency}`}
            className="w-[70%]"
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
