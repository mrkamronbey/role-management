type Labels<T extends string> = Record<T, string | { label: string }>

export const toOptions = <T extends string>(labels: Labels<T>) =>
  (Object.keys(labels) as T[]).map((value) => {
    const item = labels[value]
    return { value, label: typeof item === 'string' ? item : item.label }
  })
