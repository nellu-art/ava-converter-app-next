'use client'

import { BarsIcon } from '@/icons/BarsIcon'
import { XmarkIcon } from '@/icons/XmarkIcon'

type HeaderProps = {
  isMenuOpen: boolean
  onMenuOpenClick: () => void
}

export const Header = ({ isMenuOpen, onMenuOpenClick }: HeaderProps) => {
  return (
    <div className="w-full p-2 px-4 flex">
      <span className="flex-1 flex items-center" onClick={onMenuOpenClick}>
        {isMenuOpen ? (
          <XmarkIcon className="h-5 fill-slate-100" />
        ) : (
          <BarsIcon className="h-5 fill-slate-100" />
        )}
      </span>
      <h1 className="font-light text-lg text-gray-200">AVA Converter</h1>
      <span className="flex-1" />
    </div>
  )
}
