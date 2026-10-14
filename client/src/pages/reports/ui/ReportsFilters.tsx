import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import {
  REPORT_STATUS_META,
  REPORT_TYPE_LABELS,
  type ReportStatus,
  type ReportType,
} from '@/entities/report'
import { toOptions } from '@/shared/lib/options'
import { SearchInput } from '@/shared/ui'

const typeOptions = toOptions(REPORT_TYPE_LABELS)

const statusOptions = toOptions(REPORT_STATUS_META)

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
