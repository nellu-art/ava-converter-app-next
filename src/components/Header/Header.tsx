'use client'

import { SquarePlusIcon } from '@/icons/SquarePlusIcon'
import { XmarkIcon } from '@/icons/XmarkIcon'

type HeaderProps = {
  isMenuOpen: boolean
  onMenuOpenClick: () => void
}

export const Header = ({ isMenuOpen, onMenuOpenClick }: HeaderProps) => {
  return (
    <div className="w-full px-4 flex border-b border-indigo-800 h-[60px] items-center">
      <span className="flex-1 flex items-center" onClick={onMenuOpenClick}>
        {isMenuOpen ? (
          <XmarkIcon className="h-8 fill-indigo-800" />
        ) : (
          <SquarePlusIcon className="h-8 fill-indigo-800" />
        )}
      </span>
      <h1 className="font-medium text-2xl text-indigo-800">AVA Converter</h1>
      <span className="flex-1" />
    </div>
  )
}
