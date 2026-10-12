import type { PaymentStatus } from './types'

export const PAYMENT_STATUS_META: Record<PaymentStatus, { label: string; color: string }> = {
  SUCCESS: { label: 'Muvaffaqiyatli', color: 'success' },
  PENDING: { label: 'Kutilmoqda', color: 'warning' },
  FAILED: { label: 'Rad etilgan', color: 'error' },
}
