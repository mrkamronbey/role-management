import { Tag } from 'antd'
import { ACCESS_REQUEST_STATUS_META } from '../model/status'
import type { AccessRequestStatus } from '../model/types'

export const AccessRequestStatusTag = ({ status }: { status: AccessRequestStatus }) => {
  const { label, color } = ACCESS_REQUEST_STATUS_META[status]
  return <Tag color={color}>{label}</Tag>
}
