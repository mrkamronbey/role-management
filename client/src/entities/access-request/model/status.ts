import type { AccessRequestStatus } from './types'

export const ACCESS_REQUEST_STATUS_META: Record<
  AccessRequestStatus,
  { label: string; color: string }
> = {
  PENDING: { label: 'Kutilmoqda', color: 'warning' },
  APPROVED: { label: 'Tasdiqlangan', color: 'success' },
  REJECTED: { label: 'Rad etilgan', color: 'error' },
}
