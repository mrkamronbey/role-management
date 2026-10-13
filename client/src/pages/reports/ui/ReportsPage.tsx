import { useState } from 'react'
import { Button, Result, Typography } from 'antd'
import { useReportsQuery } from '@/entities/report'
import { getErrorMessage } from '@/shared/api'
import { PageLayout, PaginationFooter } from '@/shared/ui'
import { ReportsGrid } from './ReportsGrid'

const PAGE_SIZE = 12

export const ReportsPage = () => {
  const [page, setPage] = useState(1)
  const reportsQuery = useReportsQuery({ page, limit: PAGE_SIZE })

  const footer = reportsQuery.data && reportsQuery.data.total > 0 && (
    <PaginationFooter
      total={reportsQuery.data.total}
      page={page}
      pageSize={PAGE_SIZE}
      label="hisobot"
      onChange={setPage}
    />
  )

  return (
    <PageLayout
      header={<Typography.Text type="secondary">Davriy hisobotlar ro'yxati</Typography.Text>}
      footer={footer}
    >
      {reportsQuery.isError ? (
        <Result
          status="error"
          title="Hisobotlarni yuklab bo'lmadi"
          subTitle={getErrorMessage(reportsQuery.error)}
          extra={<Button onClick={() => reportsQuery.refetch()}>Qayta urinish</Button>}
        />
      ) : (
        <ReportsGrid reports={reportsQuery.data?.items ?? []} loading={reportsQuery.isPending} />
      )}
    </PageLayout>
  )
}
