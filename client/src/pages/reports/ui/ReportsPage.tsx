import { useState } from 'react'
import { Button, Result, Typography } from 'antd'
import { useReportsQuery } from '@/entities/report'
import { getErrorMessage } from '@/shared/api'
import { PageCard, PaginationFooter, RefreshButton, ViewSwitcher } from '@/shared/ui'
import { useReportsFilters } from '../model/useReportsFilters'
import { ReportPreviewModal } from './ReportPreviewModal'
import { ReportsFilters } from './ReportsFilters'
import { ReportsGrid } from './ReportsGrid'
import { ReportsList } from './ReportsList'

export const ReportsPage = () => {
  const filters = useReportsFilters()
  const [previewId, setPreviewId] = useState<number | null>(null)
  const { search, type, status, period, view, page, limit } = filters
  const reportsQuery = useReportsQuery({
    search: search || undefined,
    type,
    status,
    period,
    page,
    limit,
  })
  const hasFilters = Boolean(search || type || status || period)
  const previewReport = reportsQuery.data?.items.find((report) => report.id === previewId)
  const reports = reportsQuery.data?.items ?? []
  const emptyText = hasFilters
    ? "Tanlangan filtrlar bo'yicha hisobot topilmadi"
    : 'Hisobotlar mavjud emas'

  const footer = reportsQuery.data && reportsQuery.data.total > 0 && (
    <PaginationFooter
      total={reportsQuery.data.total}
      page={page}
      pageSize={limit}
      pageSizeOptions={filters.pageSizes}
      label="hisobot"
      onChange={filters.setPage}
      onPageSizeChange={filters.setLimit}
    />
  )

  return (
    <PageCard
      extra={
        <>
          <ReportsFilters
            search={search}
            type={type}
            status={status}
            period={period}
            onSearch={filters.setSearch}
            onTypeChange={filters.setType}
            onStatusChange={filters.setStatus}
            onPeriodChange={filters.setPeriod}
          />
          <ViewSwitcher value={view} onChange={filters.setView} />
          <RefreshButton loading={reportsQuery.isFetching} onClick={() => reportsQuery.refetch()} />
        </>
      }
      filters={<Typography.Text type="secondary">Davriy hisobotlar ro'yxati</Typography.Text>}
      footer={footer}
    >
      {reportsQuery.isError ? (
        <Result
          status="error"
          title="Hisobotlarni yuklab bo'lmadi"
          subTitle={getErrorMessage(reportsQuery.error)}
          extra={<Button onClick={() => reportsQuery.refetch()}>Qayta urinish</Button>}
        />
      ) : view === 'grid' ? (
        <ReportsGrid
          reports={reports}
          loading={reportsQuery.isPending}
          emptyText={emptyText}
          onOpen={(report) => setPreviewId(report.id)}
        />
      ) : (
        <ReportsList
          reports={reports}
          loading={reportsQuery.isFetching}
          emptyText={emptyText}
          startIndex={(page - 1) * limit}
          onOpen={(report) => setPreviewId(report.id)}
        />
      )}
      {previewReport && (
        <ReportPreviewModal report={previewReport} onClose={() => setPreviewId(null)} />
      )}
    </PageCard>
  )
}
