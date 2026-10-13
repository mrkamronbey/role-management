import { useState } from 'react'
import { Button, DatePicker, Result, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import {
  PAYMENT_STATUS_META,
  usePaymentsQuery,
  usePaymentsSummaryQuery,
  type PaymentStatus,
} from '@/entities/payment'
import { getErrorMessage } from '@/shared/api'
import { DataTable, PageLayout, PaginationFooter } from '@/shared/ui'
import { PaymentInspector } from './PaymentInspector'
import { PaymentsStats } from './PaymentsStats'
import { paymentsColumns } from './paymentsColumns'

type DateRange = [Dayjs | null, Dayjs | null] | null

const DATE_FORMAT = 'YYYY-MM-DD'
const PAGE_SIZE = 10

const statusOptions = Object.entries(PAYMENT_STATUS_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}))

export const PaymentsPage = () => {
  const [range, setRange] = useState<DateRange>(null)
  const [status, setStatus] = useState<PaymentStatus>()
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const period = {
    from: range?.[0]?.format(DATE_FORMAT),
    to: range?.[1]?.format(DATE_FORMAT),
  }
  const summaryQuery = usePaymentsSummaryQuery(period)
  const paymentsQuery = usePaymentsQuery({ ...period, status, page, limit: PAGE_SIZE })

  const payments = paymentsQuery.data?.items ?? []
  const selectedPayment = payments.find((payment) => payment.id === selectedId)

  const handleRangeChange = (value: DateRange) => {
    setRange(value)
    setPage(1)
  }

  const handleStatusChange = (value?: PaymentStatus) => {
    setStatus(value)
    setPage(1)
  }

  const footer = paymentsQuery.data && paymentsQuery.data.total > 0 && (
    <PaginationFooter
      total={paymentsQuery.data.total}
      page={page}
      pageSize={PAGE_SIZE}
      label="to'lov"
      onChange={setPage}
    />
  )

  return (
    <PageLayout
      header={
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PaymentsStats summary={summaryQuery.data} loading={summaryQuery.isPending} />
          <div className="flex flex-wrap gap-3">
            <Select
              allowClear
              placeholder="Holat"
              options={statusOptions}
              value={status}
              onChange={handleStatusChange}
              className="w-40"
            />
            <DatePicker.RangePicker
              value={range}
              onChange={handleRangeChange}
              format="DD.MM.YYYY"
            />
          </div>
        </div>
      }
      footer={footer}
      inspector={
        selectedPayment && (
          <PaymentInspector payment={selectedPayment} onClose={() => setSelectedId(null)} />
        )
      }
      onInspectorClose={() => setSelectedId(null)}
    >
      {paymentsQuery.isError ? (
        <Result
          status="error"
          title="To'lovlarni yuklab bo'lmadi"
          subTitle={getErrorMessage(paymentsQuery.error)}
          extra={<Button onClick={() => paymentsQuery.refetch()}>Qayta urinish</Button>}
        />
      ) : (
        <DataTable
          columns={paymentsColumns}
          data={payments}
          loading={paymentsQuery.isFetching}
          emptyText="Tanlangan filtrlar bo'yicha to'lovlar yo'q"
          scrollX={900}
          selectedId={selectedId}
          onRowClick={(payment) => setSelectedId(payment.id)}
        />
      )}
    </PageLayout>
  )
}
