import type { DateRangeQueryDto } from '../dto/date-range-query.dto.js'

const nextDay = (day: string) => {
  const date = new Date(day)
  date.setUTCDate(date.getUTCDate() + 1)
  return date
}

export const toDateFilter = ({ from, to }: DateRangeQueryDto) =>
  from || to
    ? { gte: from ? new Date(from) : undefined, lt: to ? nextDay(to) : undefined }
    : undefined
