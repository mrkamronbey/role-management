import { useState } from 'react'
import { Button, DatePicker, Result, Typography } from 'antd'
import type { Dayjs } from 'dayjs'
import { usePaymentsQuery } from '@/entities/payment'
import { getErrorMessage } from '@/shared/api'
import { PaymentInspector } from './PaymentInspector'
import { PaymentsStats } from './PaymentsStats'
import { paymentsColumns } from './paymentsColumns'
import { DataTable, PageLayout } from '@/shared/ui'

type DateRange = [Dayjs | null, Dayjs | null] | null

const DATE_FORMAT = 'YYYY-MM-DD'

export const PaymentsPage = () => {
  const [range, setRange] = useState<DateRange>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const paymentsQuery = usePaymentsQuery({
    from: range?.[0]?.format(DATE_FORMAT),
    to: range?.[1]?.format(DATE_FORMAT),
  })
  const payments = paymentsQuery.data ?? []
  const selectedPayment = payments.find((payment) => payment.id === selectedId)

  return (
    <PageLayout
      header={
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PaymentsStats payments={payments} loading={paymentsQuery.isPending} />
          <DatePicker.RangePicker value={range} onChange={setRange} format="DD.MM.YYYY" />
        </div>
      }
      footer={<Typography.Text type="secondary">Jami: {payments.length} ta to'lov</Typography.Text>}
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
          emptyText="Tanlangan davrda to'lovlar yo'q"
          scrollX={760}
          selectedId={selectedId}
          onRowClick={(payment) => setSelectedId(payment.id)}
        />
      )}
    </PageLayout>
  )
}
