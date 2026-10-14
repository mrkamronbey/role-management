import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import {
  REPORT_STATUS_META,
  REPORT_TYPE_LABELS,
  type ReportStatus,
  type ReportType,
} from '@/entities/report'
import { SearchInput } from '@/shared/ui'

const typeOptions = Object.entries(REPORT_TYPE_LABELS).map(([value, label]) => ({ value, label }))

const statusOptions = Object.entries(REPORT_STATUS_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}))

interface ReportsFiltersProps {
  search: string
  type?: ReportType
  status?: ReportStatus
  period?: string
  onSearch: (value: string) => void
  onTypeChange: (value?: ReportType) => void
  onStatusChange: (value?: ReportStatus) => void
  onPeriodChange: (value?: string) => void
}

export const ReportsFilters = ({
  search,
  type,
  status,
  period,
  onSearch,
  onTypeChange,
  onStatusChange,
  onPeriodChange,
}: ReportsFiltersProps) => (
  <>
    <SearchInput value={search} placeholder="Hisobot nomi bo'yicha qidirish" onSearch={onSearch} />
    <DatePicker
      picker="month"
      placeholder="Davr"
      format="MMMM YYYY"
      value={period ? dayjs(period) : null}
      disabledDate={(date) => date.isAfter(dayjs(), 'month')}
      onChange={(date) => onPeriodChange(date?.format('YYYY-MM'))}
      className="w-44"
    />
    <Select
      allowClear
      placeholder="Turi"
      options={typeOptions}
      value={type}
      onChange={onTypeChange}
      className="w-40"
    />
    <Select
      allowClear
      placeholder="Holati"
      options={statusOptions}
      value={status}
      onChange={onStatusChange}
      className="w-44"
    />
  </>
)
