import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDownload } from '@/shared/lib/hooks'
import { reportApi } from '../api/report.api'
import type { Report } from '../model/types'

interface ReportDownloadButtonProps {
  report: Report
  bordered?: boolean
  label?: string
}

export const ReportDownloadButton = ({
  report,
  bordered = false,
  label,
}: ReportDownloadButtonProps) => {
  const { download, loading } = useDownload()
  const isReady = report.status === 'READY'
  const fileName = `${report.reportNumber}.${report.format.toLowerCase()}`

  return (
    <Tooltip title={!label && (isReady ? 'Yuklab olish' : 'Hisobot hali tayyor emas')}>
      <Button
        type={label ? 'primary' : bordered ? 'default' : 'text'}
        icon={<DownloadOutlined />}
        loading={loading}
        disabled={!isReady}
        onClick={(event) => {
          event.stopPropagation()
          download(() => reportApi.download(report.id), fileName)
        }}
      >
        {label}
      </Button>
    </Tooltip>
  )
}
