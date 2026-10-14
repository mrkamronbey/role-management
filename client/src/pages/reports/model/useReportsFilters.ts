import {
  REPORT_STATUS_META,
  REPORT_TYPE_LABELS,
  type ReportStatus,
  type ReportType,
} from '@/entities/report'
import { useIsMobile, useUrlParams } from '@/shared/lib/hooks'
import { VIEW_MODES, type ViewMode } from '@/shared/ui'

const STATUS_OPTIONS = Object.keys(REPORT_STATUS_META) as ReportStatus[]
const TYPE_OPTIONS = Object.keys(REPORT_TYPE_LABELS) as ReportType[]

const toMonth = (value?: string) =>
  value && /^\d{4}-(0[1-9]|1[0-2])$/.test(value) ? value : undefined

export const useReportsFilters = () => {
  const { page, limit, pageSizes, getParam, getOption, setParams, setPage, setLimit } =
    useUrlParams()
  const isMobile = useIsMobile()

  return {
    search: getParam('search') ?? '',
    status: getOption('status', STATUS_OPTIONS),
    type: getOption('type', TYPE_OPTIONS),
    period: toMonth(getParam('period')),
    view: isMobile ? 'grid' : (getOption('view', VIEW_MODES) ?? 'grid'),
    page,
    limit,
    pageSizes,
    setSearch: (search: string) => setParams({ search }),
    setStatus: (status?: ReportStatus) => setParams({ status }),
    setType: (type?: ReportType) => setParams({ type }),
    setPeriod: (period?: string) => setParams({ period }),
    setView: (view: ViewMode) => setParams({ view, page: page > 1 ? String(page) : undefined }),
    setPage,
    setLimit,
  }
}
