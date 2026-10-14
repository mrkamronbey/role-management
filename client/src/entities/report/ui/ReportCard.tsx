import { Card, Typography } from 'antd'
import { formatFileSize } from '../lib/formatFileSize'
import { REPORT_TYPE_LABELS } from '../model/labels'
import type { Report } from '../model/types'
import { ReportDownloadButton } from './ReportDownloadButton'
import { ReportStatusTag } from './ReportStatusTag'
import { ReportTypeIcon } from './ReportTypeIcon'

interface ReportCardProps {
  report: Report
  onOpen: () => void
}

export const ReportCard = ({ report, onOpen }: ReportCardProps) => (
  <Card
    className="h-full cursor-pointer border-(--ant-color-border) transition-colors hover:border-(--ant-color-primary)"
    onClick={onOpen}
    styles={{ body: { display: 'flex', flexDirection: 'column', gap: 16, height: '100%' } }}
  >
    <div className="flex items-start gap-4">
      <ReportTypeIcon type={report.type} />
      <div className="min-w-0 flex-1">
        <Typography.Title level={5} className="m-0!">
          {report.title}
        </Typography.Title>
        <Typography.Text type="secondary">{report.period}</Typography.Text>
      </div>
      <ReportDownloadButton report={report} />
    </div>

    <Typography.Paragraph className="m-0!">{report.description}</Typography.Paragraph>

    <div className="mt-auto flex flex-wrap items-center gap-2">
      <ReportStatusTag status={report.status} />
      <Typography.Text type="secondary" className="text-xs">
        {REPORT_TYPE_LABELS[report.type]} · {report.format}
        {report.fileSizeKb && ` · ${formatFileSize(report.fileSizeKb)}`}
      </Typography.Text>
    </div>
  </Card>
)
