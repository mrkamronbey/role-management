import { Flex, Typography, type TableColumnsType } from 'antd'
import {
  REPORT_TYPE_LABELS,
  ReportDownloadButton,
  ReportStatusTag,
  ReportTypeIcon,
  formatFileSize,
  type Report,
} from '@/entities/report'
import { formatDate } from '@/shared/lib/format'

export const reportsColumns: TableColumnsType<Report> = [
  {
    title: 'Hisobot',
    key: 'title',
    width: 300,
    render: (_, report) => (
      <Flex align="center" gap={12}>
        <ReportTypeIcon type={report.type} size="small" />
        <Flex vertical>
          <Typography.Text strong>{report.title}</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {report.period}
          </Typography.Text>
        </Flex>
      </Flex>
    ),
  },
  { title: 'Raqami', dataIndex: 'reportNumber', key: 'reportNumber', width: 140 },
  {
    title: 'Turi',
    key: 'type',
    width: 130,
    render: (_, report) => REPORT_TYPE_LABELS[report.type],
  },
  {
    title: 'Holati',
    key: 'status',
    width: 170,
    render: (_, report) => <ReportStatusTag status={report.status} />,
  },
  { title: "Bo'lim", dataIndex: 'department', key: 'department', width: 210 },
  { title: 'Muallif', dataIndex: 'author', key: 'author', width: 140 },
  {
    title: 'Fayl',
    key: 'file',
    width: 130,
    render: (_, report) => `${report.format} · ${formatFileSize(report.fileSizeKb)}`,
  },
  {
    title: 'Sana',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: (createdAt: string) => formatDate(createdAt),
  },
  {
    title: 'Amallar',
    key: 'actions',
    width: 100,
    align: 'center',
    fixed: 'end',
    render: (_, report) => <ReportDownloadButton report={report} bordered />,
  },
]
