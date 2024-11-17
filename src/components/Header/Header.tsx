'use client'
import './style.css'

type HeaderProps = {
  isMenuOpen: boolean
  onMenuOpenClick: () => void
}

const titleFirstLine = 'AVA'
const titleSecondLine = 'Converter'

export const Header = ({ isMenuOpen, onMenuOpenClick }: HeaderProps) => {
  return (
    <div
      className={`w-full p-18 py-24 flex items-center select-none justify-between ${
        isMenuOpen ? 'bg-grey' : 'bg-dark'
      } transition-all duration-150`}
    >
      <h1 className="font-bold text-lg leading-none">
        <span className="font-rammetto">{titleFirstLine}</span>
        <br />
        <span className="leading-none">{titleSecondLine}</span>
      </h1>
      <div
        className={`flex w-8 h-8 items-center justify-center ${
          isMenuOpen ? 'toggle-burger' : ''
        }`}
        onClick={onMenuOpenClick}
      >
        <div
          className="
              w-6 h-1 bg-green rounded-full transition-all duration-150
              before:content-[''] before:absolute before:w-6 before:h-1 before:bg-green before:rounded-full before:transition-all before:duration-150
              after:content-[''] after:absolute after:w-6 after:h-1 after:bg-green after:rounded-full after:rotate-90 after:transition-all after:duration-150
            "
        />
      </div>
    </div>
  )
}
