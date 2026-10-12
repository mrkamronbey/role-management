import { Button, Result, Typography } from 'antd'
import { useReportsQuery } from '@/entities/report'
import { getErrorMessage } from '@/shared/api'
import { ReportsGrid } from './ReportsGrid'
import { PageLayout } from '@/shared/ui'

export const ReportsPage = () => {
  const reportsQuery = useReportsQuery()

  return (
    <PageLayout
      header={<Typography.Text type="secondary">Davriy hisobotlar ro'yxati</Typography.Text>}
    >
      {reportsQuery.isError ? (
        <Result
          status="error"
          title="Hisobotlarni yuklab bo'lmadi"
          subTitle={getErrorMessage(reportsQuery.error)}
          extra={<Button onClick={() => reportsQuery.refetch()}>Qayta urinish</Button>}
        />
      ) : (
        <ReportsGrid reports={reportsQuery.data ?? []} loading={reportsQuery.isPending} />
      )}
    </PageLayout>
  )
}
