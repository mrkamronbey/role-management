import { DownloadOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Tag } from 'antd'
import { formatDate } from '@/shared/lib/format'
import { REPORT_STATUS_META, REPORT_TYPE_LABELS } from '../model/labels'
import type { Report } from '../model/types'

export const ReportCard = ({ report }: { report: Report }) => {
  const { message } = App.useApp()
  const status = REPORT_STATUS_META[report.status]

  return (
    <Card title={report.title} extra={<Tag color={status.color}>{status.label}</Tag>}>
      <Descriptions
        column={1}
        size="small"
        items={[
          { label: 'Turi', children: REPORT_TYPE_LABELS[report.type] },
          { label: 'Davr', children: report.period },
          { label: 'Yaratilgan', children: formatDate(report.createdAt) },
        ]}
      />
      <Button
        block
        className="mt-4"
        icon={<DownloadOutlined />}
        disabled={report.status !== 'READY'}
        onClick={() => message.success('Hisobot yuklab olindi (demo)')}
      >
        Yuklab olish
      </Button>
    </Card>
  )
}
