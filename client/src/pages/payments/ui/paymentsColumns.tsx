import type { TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import {
  PAYMENT_STATUS_META,
  PaymentStatusTag,
  type Payment,
  type PaymentStatus,
} from '@/entities/payment'
import { formatDateTime, formatMoney } from '@/shared/lib/format'

const statusFilters = Object.entries(PAYMENT_STATUS_META).map(([value, meta]) => ({
  text: meta.label,
  value,
}))

export const paymentsColumns: TableColumnsType<Payment> = [
  { title: '№', dataIndex: 'id', key: 'id', width: 80 },
  { title: "To'lovchi", dataIndex: 'payer', key: 'payer' },
  {
    title: 'Summa',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    sorter: (a, b) => a.amount - b.amount,
    render: (amount: number) => <span className="font-medium">{formatMoney(amount)}</span>,
  },
  { title: "To'lov usuli", dataIndex: 'method', key: 'method' },
  {
    title: 'Holat',
    dataIndex: 'status',
    key: 'status',
    filters: statusFilters,
    onFilter: (value, payment) => payment.status === value,
    render: (status: PaymentStatus) => <PaymentStatusTag status={status} />,
  },
  {
    title: 'Sana',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    render: (createdAt: string) => formatDateTime(createdAt),
  },
]
