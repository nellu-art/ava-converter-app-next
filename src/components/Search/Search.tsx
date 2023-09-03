type SearchProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export const Search = ({ placeholder, value, onChange }: SearchProps) => {
  return (
    <div>
      <input
        type="text"
        name="search-input"
        id="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full text-xl rounded-md border-0 py-1.5 px-1 text-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none bg-slate-800"
      />
    </div>
  )
}
