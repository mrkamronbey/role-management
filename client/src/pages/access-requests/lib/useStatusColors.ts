import { theme } from 'antd'
import type { AccessRequestStatus } from '@/entities/access-request'

export const useStatusColors = (): Record<AccessRequestStatus, string> => {
  const { token } = theme.useToken()

  return {
    PENDING: token.colorWarning,
    APPROVED: token.colorSuccess,
    REJECTED: token.colorError,
  }
}
