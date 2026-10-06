import { useEffect, useState } from 'react'

interface StoredValue<T> {
  value: T
  error: string
}

function readStoredValue<T>(key: string, initialValue: T, isValid: (value: unknown) => value is T): StoredValue<T> {
  try {
    const stored = window.localStorage.getItem(key)
    if (!stored) return { value: initialValue, error: '' }

    const parsed: unknown = JSON.parse(stored)
    if (!isValid(parsed)) {
      return { value: initialValue, error: 'Saved browser data was invalid and has been reset.' }
    }
    return { value: parsed, error: '' }
  } catch {
    return { value: initialValue, error: 'Browser storage is unavailable. Changes may not be saved.' }
  }
}

export function useLocalStorage<T>(key: string, initialValue: T, isValid: (value: unknown) => value is T) {
  const [storedValue] = useState(() => readStoredValue(key, initialValue, isValid))
  const [value, setValue] = useState<T>(storedValue.value)
  const [storageError, setStorageError] = useState(storedValue.error)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStorageError('')
    } catch {
      setStorageError('Browser storage is unavailable. Changes may not be saved.')
    }
  }, [key, value])

  return [value, setValue, storageError] as const
}
