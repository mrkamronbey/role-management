import { Descriptions, Typography } from 'antd'
import { PaymentStatusTag, type Payment } from '@/entities/payment'
import { formatDateTime, formatMoney } from '@/shared/lib/format'
import { Inspector } from '@/shared/ui'

interface PaymentInspectorProps {
  payment: Payment
  onClose: () => void
}

export const PaymentInspector = ({ payment, onClose }: PaymentInspectorProps) => (
  <Inspector title={`To'lov №${payment.id}`} onClose={onClose}>
    <div className="mb-6">
      <Typography.Text type="secondary" className="text-xs uppercase">
        Summa
      </Typography.Text>
      <Typography.Title level={3} className="my-1">
        {formatMoney(payment.amount)}
      </Typography.Title>
      <PaymentStatusTag status={payment.status} />
    </div>

    <Descriptions
      column={1}
      size="small"
      items={[
        { label: "To'lovchi", children: payment.payer },
        { label: "To'lov usuli", children: payment.method },
        { label: 'Sana', children: formatDateTime(payment.createdAt) },
      ]}
    />
  </Inspector>
)
