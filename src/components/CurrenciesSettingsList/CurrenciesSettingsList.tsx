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
    <div
      className={`relative flex w-full h-full items-center p-18 rounded ${
        isChecked ? 'bg-opacity10' : ''
      }`}
    >
      <label
        htmlFor={`${country}-${currency}`}
        className="text-lg select-none flex-1"
      >
        <span className="font-rammetto mr-4 min-w-[4rem] inline-block">
          {currency}
        </span>

        <span className="font-miriam font-medium">{country}</span>
      </label>

      <div className="flex items-center">
        <input
          id={`${country}-${currency}`}
          name={`${country}-${currency}`}
          type="checkbox"
          className="appearance-none h-6 w-6 rounded border-4 border-lightGrey checked:bg-lightGrey"
          defaultChecked={isChecked}
        />
      </div>
    </div>
  )
}

export type CurrenciesSettingsListProps = {
  currencies: (CurrencyCheckboxProps & { isDisplayed?: boolean })[]
  onChange: (selectedCurrencies: string[]) => void
}

export const CurrenciesSettingsList = ({
  currencies,
  onChange,
}: CurrenciesSettingsListProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const totalEurCurrencyCountries = currencies.filter(
    ({ currency }) => currency === 'EUR'
  ).length

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData.entries())
      const fieldNames = Object.keys(data)
      const eurCurrencyFields = fieldNames.filter((field) =>
        field.includes('EUR')
      )
      const selectedCurrencies = new Set(
        fieldNames.map((field) => field.split('-')[1])
      )
      if (eurCurrencyFields.length + 1 === totalEurCurrencyCountries) {
        selectedCurrencies.delete('EUR')
      }
      onChange(Array.from(selectedCurrencies))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-3">
        {currencies.map(({ country, currency, isDisplayed, ...rest }) => (
          <div
            key={`${country}-${currency}-${rest.isChecked}`}
            className={`w-full ${isDisplayed ? 'block' : 'hidden'}`}
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
