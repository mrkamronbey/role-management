const DEFAULT_DAYS = 30

const toDay = (date: Date) => date.toISOString().slice(0, 10)

export const addDays = (day: string, days: number) => {
  const date = new Date(day)
  date.setUTCDate(date.getUTCDate() + days)
  return toDay(date)
}

export const getPeriod = (from?: string, to?: string) => {
  const end = to ?? toDay(new Date())
  const start = from ?? addDays(end, -(DEFAULT_DAYS - 1))
  return { from: start, to: end }
}

export const getDays = (from: string, to: string) => {
  const days: string[] = []
  for (let day = from; day <= to; day = addDays(day, 1)) {
    days.push(day)
  }
  return days
}

export const countBy = <T>(items: T[], getKey: (item: T) => string) => {
  const counts: Record<string, number> = {}
  items.forEach((item) => {
    const key = getKey(item)
    counts[key] = (counts[key] ?? 0) + 1
  })
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
}
