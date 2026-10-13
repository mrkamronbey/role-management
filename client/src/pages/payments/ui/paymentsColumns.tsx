import type { TableColumnsType } from 'antd'
import { PaymentStatusTag, type Payment, type PaymentStatus } from '@/entities/payment'
import { formatDateTime, formatMoney } from '@/shared/lib/format'

export const paymentsColumns: TableColumnsType<Payment> = [
  { title: 'Chek', dataIndex: 'receiptNumber', key: 'receiptNumber', width: 110 },
  { title: "To'lovchi", dataIndex: 'payer', key: 'payer' },
  { title: 'Qabul qiluvchi', dataIndex: 'recipient', key: 'recipient' },
  {
    title: 'Summa',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (amount: number) => <span className="font-medium">{formatMoney(amount)}</span>,
  },
  {
    title: 'Holat',
    dataIndex: 'status',
    key: 'status',
    render: (status: PaymentStatus) => <PaymentStatusTag status={status} />,
  },
  {
    title: 'Sana',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => formatDateTime(createdAt),
  },
]
