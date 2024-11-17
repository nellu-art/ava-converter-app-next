import { useLayoutEffect, useRef, useState } from 'react'
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
  onMount: (headerHeight: number) => void
}

export const HeaderWithMenu = ({
  currencies,
  selectedCurrencies,
  onChangeSelectedCurrencies,
  onMount,
}: HeaderWithMenuProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredCurrencies = currencies.map((record) => ({
    ...record,
    isChecked: selectedCurrencies.includes(record.currency),
    isDisplayed: `${record.country} ${record.currency}`
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  }))

  useLayoutEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.clientHeight
      onMount(headerHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col">
      <div ref={headerRef}>
        <Header
          isMenuOpen={isMenuOpen}
          onMenuOpenClick={() => {
            setIsMenuOpen((prev) => !prev)
            if (!isMenuOpen) {
              setSearchValue('')
            }
          }}
        />
      </div>
      <div
        className={`z-10 bg-grey overflow-hidden ${
          isMenuOpen ? 'flex flex-1 py-18' : 'h-0 flex-0'
        } flex-col transition-all duration-300 px-18`}
      >
        <div className="mb-4 pr-2">
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
