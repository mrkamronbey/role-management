import { Tag } from 'antd'
import { PAYMENT_STATUS_META } from '../model/status'
import type { PaymentStatus } from '../model/types'

export const PaymentStatusTag = ({ status }: { status: PaymentStatus }) => {
  const { label, color } = PAYMENT_STATUS_META[status]
  return <Tag color={color}>{label}</Tag>
}
