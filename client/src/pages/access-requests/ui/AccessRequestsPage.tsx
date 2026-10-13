import { useState } from 'react'
import { Button, Result, Segmented, Skeleton, Typography } from 'antd'
import { useAccessRequestsQuery, usePendingRequestsQuery } from '@/entities/access-request'
import { getErrorMessage } from '@/shared/api'
import { EmptyState, PageLayout, PaginationFooter } from '@/shared/ui'
import { AccessRequestCard } from './AccessRequestCard'

type Tab = 'pending' | 'reviewed'

const PAGE_SIZE = 10

export const AccessRequestsPage = () => {
  const [tab, setTab] = useState<Tab>('pending')
  const [page, setPage] = useState(1)
  const pendingQuery = usePendingRequestsQuery()
  const { data, isPending, isError, error, refetch } = useAccessRequestsQuery({
    status: tab,
    page,
    limit: PAGE_SIZE,
  })

  const handleTabChange = (value: Tab) => {
    setTab(value)
    setPage(1)
  }

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
  } else if (data.items.length === 0) {
    content = (
      <EmptyState
        description={tab === 'pending' ? "Yangi so'rovlar yo'q" : "Ko'rib chiqilgan so'rovlar yo'q"}
      />
    )
  } else {
    content = (
      <div className="flex flex-col gap-3">
        {data.items.map((request) => (
          <AccessRequestCard key={request.id} request={request} />
        ))}
      </div>
    )
  }

  const footer = data && data.total > 0 && (
    <PaginationFooter
      total={data.total}
      page={page}
      pageSize={PAGE_SIZE}
      label="so'rov"
      onChange={setPage}
    />
  )

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
            onChange={handleTabChange}
            options={[
              { value: 'pending', label: `Kutilmoqda · ${pendingQuery.data?.total ?? 0}` },
              { value: 'reviewed', label: "Ko'rib chiqilgan" },
            ]}
          />
        </div>
      }
      footer={footer}
    >
      {content}
    </PageLayout>
  )
}
