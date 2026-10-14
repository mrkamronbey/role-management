import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { REPORT_STATUS_META } from '../model/labels'
import type { ReportStatus } from '../model/types'

export const ReportStatusTag = ({ status }: { status: ReportStatus }) => {
  const meta = REPORT_STATUS_META[status]

  return (
    <Tag
      variant="filled"
      color={meta.color}
      icon={status === 'READY' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
      className="m-0"
    >
      {meta.label}
    </Tag>
  )
}
