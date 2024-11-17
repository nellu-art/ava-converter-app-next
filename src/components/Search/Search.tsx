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
        className="block w-full text-lg rounded border-0 py-2 px-4 focus:ring-1 focus:ring-inset focus:outline-none bg-dark focus:ring-green font-miriam"
      />
    </div>
  )
}
