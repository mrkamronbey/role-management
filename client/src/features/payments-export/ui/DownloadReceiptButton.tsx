import { FilePdfOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { paymentApi, type Payment } from '@/entities/payment'
import { useDownload } from '@/shared/lib/hooks'

interface DownloadReceiptButtonProps {
  payment: Payment
  iconOnly?: boolean
}

export const DownloadReceiptButton = ({
  payment,
  iconOnly = false,
}: DownloadReceiptButtonProps) => {
  const { download, loading } = useDownload()

  return (
    <Tooltip title={iconOnly && 'PDF yuklab olish'}>
      <Button
        block={!iconOnly}
        type={iconOnly ? 'default' : 'primary'}
        icon={<FilePdfOutlined />}
        loading={loading}
        onClick={() =>
          download(() => paymentApi.downloadReceipt(payment.id), `${payment.receiptNumber}.pdf`)
        }
      >
        {!iconOnly && 'PDF yuklab olish'}
      </Button>
    </Tooltip>
  )
}
