import { useMemo } from 'react'

export const useOptions = <T>(
  items: T[] | undefined,
  getValue: (item: T) => string,
  getLabel: (item: T) => string,
) => {
  return useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item) => ({ value: getValue(item), label: getLabel(item) }))
  }, [items, getValue, getLabel])
}
