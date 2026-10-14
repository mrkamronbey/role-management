import { Button, Modal } from 'antd'
import { ReportDownloadButton, ReportPreview, type Report } from '@/entities/report'

interface ReportPreviewModalProps {
  report: Report
  onClose: () => void
}

export const ReportPreviewModal = ({ report, onClose }: ReportPreviewModalProps) => (
  <Modal
    open
    title="Hisobotni ko'rish"
    width={860}
    centered
    styles={{ body: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' } }}
    onCancel={onClose}
    footer={[
      <Button key="close" onClick={onClose}>
        Yopish
      </Button>,
      <ReportDownloadButton key="download" report={report} label="Yuklab olish" />,
    ]}
  >
    <ReportPreview report={report} />
  </Modal>
)
