import { useEffect, useState } from 'react'

const read = <T>(key: string, initialValue: T): T => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : initialValue
  } catch {
    return initialValue
  }
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => read(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
