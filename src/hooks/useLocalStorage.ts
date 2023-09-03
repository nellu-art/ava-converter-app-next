import { useCallback, useMemo, useState } from 'react'

const baseKey = '_ava_converter_app'

// copied by https://usehooks.com/useLocalStorage/
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const itemObject = window.localStorage.getItem(`${baseKey}_${key}`)
      if (itemObject) {
        const parsed = JSON.parse(itemObject) as { value: T }

        return parsed.value
      }

      return initialValue
    } catch (error) {
      // If error also return initialValue
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.localStorage.setItem(
          `${baseKey}_${key}`,
          JSON.stringify({ value: valueToStore })
        )
      } catch {
        /* ignore */
      }
    },
    [key, storedValue]
  )

  return useMemo(
    () => [storedValue, setValue] as const,
    [setValue, storedValue]
  )
}
