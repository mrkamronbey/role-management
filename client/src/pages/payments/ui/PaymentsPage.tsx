import { useState } from 'react'
import { Select } from 'antd'
import {
  PAYMENT_STATUS_META,
  usePaymentsQuery,
  usePaymentsSummaryQuery,
  type PaymentStatus,
} from '@/entities/payment'
import { ExportPaymentsButton } from '@/features/payments-export'
import { useIsMobile, useLocalStorage } from '@/shared/lib/hooks'
import {
  ColumnSelector,
  DataTable,
  DateRangeFilter,
  ErrorResult,
  PageCard,
  PaginationFooter,
  RefreshButton,
} from '@/shared/ui'
import { toOptions } from '@/shared/lib/options'
import { usePaymentsFilters } from '../model/usePaymentsFilters'
import { PaymentInspector } from './PaymentInspector'
import { PaymentsCardList } from './PaymentsCardList'
import { PaymentsStats } from './PaymentsStats'
import {
  DEFAULT_PAYMENT_COLUMNS,
  PAYMENT_COLUMN_TITLES,
  getReceiptColumn,
  paymentsColumns,
} from './paymentsColumns'

const statusOptions = toOptions(PAYMENT_STATUS_META)

export const PaymentsPage = () => {
  const { from, to, status, page, limit, pageSizes, setPeriod, setStatus, setPage, setLimit } =
    usePaymentsFilters()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const [columnSettings, setColumnSettings] = useLocalStorage(
    'payments-table-columns',
    DEFAULT_PAYMENT_COLUMNS,
  )

  const columns = columnSettings.flatMap((setting) => {
    const column = paymentsColumns.find((item) => item.key === setting.key)
    return setting.visible && column ? [column] : []
  })
  const tableColumns = [...columns, getReceiptColumn((payment) => setSelectedId(payment.id))]

  const summaryQuery = usePaymentsSummaryQuery({ from, to })
  const paymentsQuery = usePaymentsQuery({ from, to, status, page, limit })

  const handleRefresh = () => {
    paymentsQuery.refetch()
    summaryQuery.refetch()
  }

  const payments = paymentsQuery.data?.items ?? []
  const selectedPayment = payments.find((payment) => payment.id === selectedId)

  return (
    <PageCard
      extra={
        <>
          <Select
            allowClear
            placeholder="Holat"
            options={statusOptions}
            value={status}
            onChange={(value?: PaymentStatus) => setStatus(value)}
            className="w-40"
          />
          <DateRangeFilter from={from} to={to} onChange={setPeriod} />
          {!isMobile && (
            <ColumnSelector
              titles={PAYMENT_COLUMN_TITLES}
              value={columnSettings}
              defaultValue={DEFAULT_PAYMENT_COLUMNS}
              onChange={setColumnSettings}
            />
          )}
          <ExportPaymentsButton filters={{ from, to, status }} />
          <RefreshButton loading={paymentsQuery.isFetching} onClick={handleRefresh} />
        </>
      }
      filters={<PaymentsStats summary={summaryQuery.data} loading={summaryQuery.isPending} />}
      footer={
        paymentsQuery.data &&
        paymentsQuery.data.total > 0 && (
          <PaginationFooter
            total={paymentsQuery.data.total}
            page={page}
            pageSize={limit}
            pageSizeOptions={pageSizes}
            label="to'lov"
            onChange={setPage}
            onPageSizeChange={setLimit}
          />
        )
      }
    >
      {paymentsQuery.isError ? (
        <ErrorResult
          title="To'lovlarni yuklab bo'lmadi"
          error={paymentsQuery.error}
          onRetry={paymentsQuery.refetch}
        />
      ) : isMobile ? (
        <PaymentsCardList
          payments={payments}
          loading={paymentsQuery.isFetching}
          selectedId={selectedId}
          onOpen={(payment) => setSelectedId(payment.id)}
        />
      ) : (
        <DataTable
          columns={tableColumns}
          data={payments}
          loading={paymentsQuery.isFetching}
          emptyText="Tanlangan filtrlar bo'yicha to'lovlar yo'q"
          minWidth={tableColumns.reduce((sum, column) => sum + Number(column.width), 64)}
          startIndex={(page - 1) * limit}
          fixedColumns={1}
          selectedId={selectedId}
        />
      )}
      {selectedPayment && (
        <PaymentInspector payment={selectedPayment} onClose={() => setSelectedId(null)} />
      )}
    </PageCard>
  )
}
