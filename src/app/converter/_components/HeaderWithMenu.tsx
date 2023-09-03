import { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Search } from '@/components/Search/Search'
import {
  CurrenciesSettingsList,
  CurrenciesSettingsListProps,
} from '@/components/CurrenciesSettingsList/CurrenciesSettingsList'

type HeaderWithMenuProps = {
  currencies: CurrenciesSettingsListProps['currencies']
  selectedCurrencies: string[]
  onChangeSelectedCurrencies: (selectedCurrencies: string[]) => void
}

export const HeaderWithMenu = ({
  currencies,
  selectedCurrencies,
  onChangeSelectedCurrencies,
}: HeaderWithMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredCurrencies = currencies.map((record) => ({
    ...record,
    isChecked: selectedCurrencies.includes(record.currency),
    isDisplayed: `${record.country} ${record.currency}`
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  }))

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col">
      <Header
        isMenuOpen={isMenuOpen}
        onMenuOpenClick={() => {
          setIsMenuOpen((prev) => !prev)
          if (!isMenuOpen) {
            setSearchValue('')
          }
        }}
      />
      <div
        className={`z-10 bg-[rgb(var(--background-rgb))] flex-1 p-6 overflow-hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } flex flex-col`}
      >
        <div className="mb-6 pr-2">
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Enter currency or country"
          />
        </div>

        <div className="overflow-y-auto h-full pr-2">
          <CurrenciesSettingsList
            currencies={filteredCurrencies}
            onChange={onChangeSelectedCurrencies}
          />
        </div>
      </div>
    </div>
  )
}
