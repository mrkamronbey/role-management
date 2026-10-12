import { useState } from 'react'
import { Button, Result, Segmented, Skeleton, Typography } from 'antd'
import { useAccessRequestsQuery } from '@/entities/access-request'
import { getErrorMessage } from '@/shared/api'
import { EmptyState, PageLayout } from '@/shared/ui'
import { AccessRequestCard } from './AccessRequestCard'

type Tab = 'pending' | 'reviewed'

export const AccessRequestsPage = () => {
  const [tab, setTab] = useState<Tab>('pending')
  const { data = [], isPending, isError, error, refetch } = useAccessRequestsQuery()

  const pending = data.filter((request) => request.status === 'PENDING')
  const reviewed = data.filter((request) => request.status !== 'PENDING')
  const requests = tab === 'pending' ? pending : reviewed

  let content
  if (isPending) {
    content = <Skeleton active paragraph={{ rows: 4 }} />
  } else if (isError) {
    content = (
      <Result
        status="error"
        title="So'rovlarni yuklab bo'lmadi"
        subTitle={getErrorMessage(error)}
        extra={<Button onClick={() => refetch()}>Qayta urinish</Button>}
      />
    )
  } else if (requests.length === 0) {
    content = (
      <EmptyState
        description={tab === 'pending' ? "Yangi so'rovlar yo'q" : "Ko'rib chiqilgan so'rovlar yo'q"}
      />
    )
  } else {
    content = (
      <div className="flex flex-col gap-3">
        {requests.map((request) => (
          <AccessRequestCard key={request.id} request={request} />
        ))}
      </div>
    )
  }

  return (
    <PageLayout
      header={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography.Text type="secondary">
            Xodim yopiq bo'limga kirmoqchi bo'lsa, so'rov shu yerga keladi. Tasdiqlansa, rol darhol
            biriktiriladi.
          </Typography.Text>
          <Segmented<Tab>
            value={tab}
            onChange={setTab}
            options={[
              { value: 'pending', label: `Kutilmoqda · ${pending.length}` },
              { value: 'reviewed', label: `Ko'rib chiqilgan · ${reviewed.length}` },
            ]}
          />
        </div>
      }
    >
      {content}
    </PageLayout>
  )
}
