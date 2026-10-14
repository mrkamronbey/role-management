import { Card, Col, Row, Skeleton } from 'antd'
import { ReportCard, type Report } from '@/entities/report'
import { EmptyState } from '@/shared/ui'

interface ReportsGridProps {
  reports: Report[]
  loading: boolean
  emptyText: string
  onOpen: (report: Report) => void
}

export const ReportsGrid = ({ reports, loading, emptyText, onOpen }: ReportsGridProps) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 6 }, (_, index) => (
          <Col key={index} xs={24} md={12} xl={8} xxl={6}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (reports.length === 0) {
    return <EmptyState description={emptyText} />
  }

  return (
    <Row gutter={[16, 16]}>
      {reports.map((report) => (
        <Col key={report.id} xs={24} md={12} xl={8} xxl={6}>
          <ReportCard report={report} onOpen={() => onOpen(report)} />
        </Col>
      ))}
    </Row>
  )
}
