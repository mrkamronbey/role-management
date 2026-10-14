import { Button, Col, Flex, Result, Row, Segmented, Select, Skeleton, Typography } from 'antd'
import { useAccessRequestsQuery, usePendingRequestsQuery } from '@/entities/access-request'
import { getErrorMessage } from '@/shared/api'
import { ROLES, ROLE_LABELS } from '@/shared/config'
import { useIsMobile } from '@/shared/lib/hooks'
import {
  EmptyState,
  PageCard,
  PaginationFooter,
  RefreshButton,
  SearchInput,
  ViewSwitcher,
  DateRangeFilter,
} from '@/shared/ui'
import { useAccessRequestsFilters, type Tab } from '../model/useAccessRequestsFilters'
import { AccessRequestCard } from './AccessRequestCard'
import { AccessRequestRow } from './AccessRequestRow'

const roleOptions = [ROLES.PAYMENT, ROLES.REPORTS].map((role) => ({
  value: role,
  label: ROLE_LABELS[role],
}))

export const AccessRequestsPage = () => {
  const filters = useAccessRequestsFilters()
  const isMobile = useIsMobile()
  const { tab, search, role, from, to, view, page, limit } = filters
  const pendingQuery = usePendingRequestsQuery()
  const { data, isPending, isFetching, isError, error, refetch } = useAccessRequestsQuery({
    status: tab,
    search: search || undefined,
    role,
    from,
    to,
    page,
    limit,
  })

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
        description={
          search || role || from || to
            ? "Tanlangan filtrlar bo'yicha so'rov topilmadi"
            : tab === 'pending'
              ? "Yangi so'rovlar yo'q"
              : "Ko'rib chiqilgan so'rovlar yo'q"
        }
      />
    )
  } else if (view === 'list') {
    content = (
      <Flex vertical gap={12}>
        {data.items.map((request) => (
          <AccessRequestRow key={request.id} request={request} />
        ))}
      </Flex>
    )
  } else {
    content = (
      <Row gutter={[16, 16]}>
        {data.items.map((request) => (
          <Col key={request.id} xs={24} xl={12}>
            <AccessRequestCard request={request} />
          </Col>
        ))}
      </Row>
    )
  }

  const footer = data && data.total > 0 && (
    <PaginationFooter
      total={data.total}
      page={page}
      pageSize={limit}
      pageSizeOptions={filters.pageSizes}
      label="so'rov"
      onChange={filters.setPage}
      onPageSizeChange={filters.setLimit}
    />
  )

  return (
    <PageCard
      extra={
        <>
          <SearchInput
            value={search}
            placeholder="Xodim ismi yoki email"
            onSearch={filters.setSearch}
            className="w-56"
          />
          <Select
            allowClear
            placeholder="Rol"
            options={roleOptions}
            value={role}
            onChange={filters.setRole}
            className="w-36"
          />
          <DateRangeFilter from={from} to={to} onChange={filters.setPeriod} />
          <ViewSwitcher value={view} onChange={filters.setView} />
          <RefreshButton loading={isFetching} onClick={() => refetch()} />
        </>
      }
      filters={
        <Flex vertical={isMobile} wrap align={isMobile ? undefined : 'center'} gap={12}>
          <Segmented<Tab>
            block={isMobile}
            value={tab}
            onChange={filters.setTab}
            options={[
              { value: 'pending', label: `Kutilmoqda · ${pendingQuery.data?.total ?? 0}` },
              { value: 'reviewed', label: "Ko'rib chiqilgan" },
            ]}
            className="border border-(--ant-color-border) bg-(--ant-color-bg-container) p-px!"
          />
          <Typography.Text type="secondary">
            Xodim yopiq bo'limga kirmoqchi bo'lsa, so'rov shu yerga keladi. Tasdiqlansa, rol darhol
            biriktiriladi.
          </Typography.Text>
        </Flex>
      }
      footer={footer}
    >
      {content}
    </PageCard>
  )
}
