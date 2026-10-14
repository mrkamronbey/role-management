import { DatePicker } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'

type DateRange = [Dayjs | null, Dayjs | null] | null

const DATE_FORMAT = 'YYYY-MM-DD'

interface DateRangeFilterProps {
  from?: string
  to?: string
  onChange: (from?: string, to?: string) => void
}

export const DateRangeFilter = ({ from, to, onChange }: DateRangeFilterProps) => {
  const value: DateRange = from || to ? [from ? dayjs(from) : null, to ? dayjs(to) : null] : null

  return (
    <DatePicker.RangePicker
      value={value}
      format="DD.MM.YYYY"
      className="w-80"
      onChange={(range: DateRange) =>
        onChange(range?.[0]?.format(DATE_FORMAT), range?.[1]?.format(DATE_FORMAT))
      }
    />
  )
}
