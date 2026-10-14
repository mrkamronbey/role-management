import { FileTextOutlined } from '@ant-design/icons'
import { Button, Flex, Tooltip, type TableColumnsType } from 'antd'
import { PaymentStatusTag, type Payment, type PaymentStatus } from '@/entities/payment'
import { DownloadReceiptButton } from '@/features/payments-export'
import { formatDateTime, formatMoney } from '@/shared/lib/format'
import type { ColumnSetting } from '@/shared/ui'

export const paymentsColumns: TableColumnsType<Payment> = [
  { title: 'Chek', dataIndex: 'receiptNumber', key: 'receiptNumber', width: 120 },
  { title: 'Tranzaksiya ID', dataIndex: 'transactionId', key: 'transactionId', width: 140 },
  { title: "To'lovchi", dataIndex: 'payer', key: 'payer', width: 150 },
  { title: "To'lovchi hisobi", dataIndex: 'payerAccount', key: 'payerAccount', width: 180 },
  { title: 'Qabul qiluvchi', dataIndex: 'recipient', key: 'recipient', width: 200 },
  {
    title: 'Qabul qiluvchi hisobi',
    dataIndex: 'recipientAccount',
    key: 'recipientAccount',
    width: 180,
  },
  { title: "To'lov maqsadi", dataIndex: 'purpose', key: 'purpose', width: 240 },
  {
    title: 'Summa',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    width: 160,
    render: (amount: number) => <span className="font-medium">{formatMoney(amount)}</span>,
  },
  {
    title: 'Komissiya',
    dataIndex: 'commission',
    key: 'commission',
    align: 'right',
    width: 130,
    render: (commission: number) => formatMoney(commission),
  },
  { title: "To'lov usuli", dataIndex: 'method', key: 'method', width: 140 },
  {
    title: 'Holat',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (status: PaymentStatus) => <PaymentStatusTag status={status} />,
  },
  {
    title: 'Sana',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    render: (createdAt: string) => formatDateTime(createdAt),
  },
]

export const PAYMENT_COLUMN_TITLES = Object.fromEntries(
  paymentsColumns.map((column) => [String(column.key), String(column.title)]),
)

const DEFAULT_VISIBLE = ['receiptNumber', 'payer', 'recipient', 'amount', 'status', 'createdAt']

export const DEFAULT_PAYMENT_COLUMNS: ColumnSetting[] = paymentsColumns.map((column) => ({
  key: String(column.key),
  visible: DEFAULT_VISIBLE.includes(String(column.key)),
}))

export const getReceiptColumn = (
  onOpen: (payment: Payment) => void,
): TableColumnsType<Payment>[number] => ({
  title: 'Amallar',
  key: 'receipt',
  width: 120,
  align: 'center',
  fixed: 'end',
  render: (_, payment) => (
    <Flex gap={8} justify="center">
      <Tooltip title="Chekni ko'rish">
        <Button icon={<FileTextOutlined />} onClick={() => onOpen(payment)} />
      </Tooltip>
      <DownloadReceiptButton payment={payment} iconOnly />
    </Flex>
  ),
})
