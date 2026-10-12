import { Card, Col, Row, Skeleton } from 'antd'
import { ReportCard, type Report } from '@/entities/report'
import { EmptyState } from '@/shared/ui'

interface ReportsGridProps {
  reports: Report[]
  loading: boolean
}

export const ReportsGrid = ({ reports, loading }: ReportsGridProps) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 6 }, (_, index) => (
          <Col key={index} xs={24} md={12} xl={8}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (reports.length === 0) {
    return <EmptyState description="Hisobotlar mavjud emas" />
  }

  return (
    <Row gutter={[16, 16]}>
      {reports.map((report) => (
        <Col key={report.id} xs={24} md={12} xl={8}>
          <ReportCard report={report} />
        </Col>
      ))}
    </Row>
  )
}
