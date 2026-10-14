import type { Report } from '@/entities/report'
import { DataTable } from '@/shared/ui'
import { reportsColumns } from './reportsColumns'

interface ReportsListProps {
  reports: Report[]
  loading: boolean
  emptyText: string
  startIndex: number
  onOpen: (report: Report) => void
}

const MIN_WIDTH = reportsColumns.reduce((sum, column) => sum + Number(column.width), 64)

export const ReportsList = ({
  reports,
  loading,
  emptyText,
  startIndex,
  onOpen,
}: ReportsListProps) => (
  <DataTable
    columns={reportsColumns}
    data={reports}
    loading={loading}
    emptyText={emptyText}
    minWidth={MIN_WIDTH}
    startIndex={startIndex}
    onRowClick={onOpen}
  />
)
