import { PaymentReceipt, type Payment } from '@/entities/payment'
import { DownloadReceiptButton } from '@/features/payments-export'
import { Inspector } from '@/shared/ui'

interface PaymentInspectorProps {
  payment: Payment
  onClose: () => void
}

export const PaymentInspector = ({ payment, onClose }: PaymentInspectorProps) => (
  <Inspector
    title="To'lov ma'lumotlari"
    footer={<DownloadReceiptButton payment={payment} />}
    onClose={onClose}
  >
    <PaymentReceipt payment={payment} />
  </Inspector>
)
