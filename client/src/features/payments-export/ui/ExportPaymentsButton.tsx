import {
  DownOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import dayjs from 'dayjs'
import {
  paymentApi,
  type PaymentsExportFormat,
  type PaymentsExportParams,
} from '@/entities/payment'
import { useDownload } from '@/shared/lib/hooks'

type ExportFilters = Omit<PaymentsExportParams, 'format'>

export const ExportPaymentsButton = ({ filters }: { filters: ExportFilters }) => {
  const { download, loading } = useDownload()

  const handleExport = (format: PaymentsExportFormat) =>
    download(
      () => paymentApi.exportFile({ ...filters, format }),
      `tolovlar-${dayjs().format('YYYY-MM-DD')}.${format}`,
    )

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      menu={{
        items: [
          { key: 'xlsx', icon: <FileExcelOutlined />, label: 'Excel (.xlsx)' },
          { key: 'csv', icon: <FileTextOutlined />, label: 'CSV (.csv)' },
        ],
        onClick: ({ key }) => handleExport(key as PaymentsExportFormat),
      }}
    >
      <Button icon={<DownloadOutlined />} loading={loading}>
        Eksport
        <DownOutlined className="text-xs" />
      </Button>
    </Dropdown>
  )
}
