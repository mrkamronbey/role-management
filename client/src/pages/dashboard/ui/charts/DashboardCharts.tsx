import { Col, Row, theme } from 'antd'
import type { Analytics, ChartItem } from '@/entities/analytics'
import { PAYMENT_STATUS_META, type PaymentStatus } from '@/entities/payment'
import { REPORT_TYPE_LABELS, type ReportType } from '@/entities/report'
import { BRAND_COLORS, ROLE_LABELS, type RoleName } from '@/shared/config'
import { ChartCard } from './ChartCard'
import { DistributionPieChart } from './DistributionPieChart'
import { PaymentsTrendChart } from './PaymentsTrendChart'
import { RolesRadialChart } from './RolesRadialChart'
import { TypesRadarChart } from './TypesRadarChart'

const toChartData = (items: ChartItem[], getLabel: (name: string) => string = (name) => name) =>
  items.map((item) => ({ label: getLabel(item.name), count: item.count }))

export const DashboardCharts = ({ analytics }: { analytics: Analytics }) => {
  const { token } = theme.useToken()
  const { payments, reports, users } = analytics

  const statusColors: Record<PaymentStatus, string> = {
    SUCCESS: token.colorSuccess,
    PENDING: token.colorWarning,
    FAILED: token.colorError,
  }
  const roleColors: Record<RoleName, string> = {
    ADMIN: token.colorError,
    PAYMENT: token.colorSuccess,
    REPORTS: token.colorInfo,
  }
  const palette = [BRAND_COLORS.primary, token.blue, token.green, token.purple]

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={16}>
        <ChartCard title="Muvaffaqiyatli to'lovlar">
          <PaymentsTrendChart data={payments.byDay} />
        </ChartCard>
      </Col>
      <Col xs={24} xl={8}>
        <ChartCard title="To'lovlar holati" isEmpty={payments.byStatus.length === 0}>
          <DistributionPieChart
            donut
            data={payments.byStatus.map((item) => {
              const status = item.name as PaymentStatus
              return {
                label: PAYMENT_STATUS_META[status].label,
                count: item.count,
                fill: statusColors[status],
              }
            })}
          />
        </ChartCard>
      </Col>
      <Col xs={24} md={12} xl={8}>
        <ChartCard title="To'lov usullari" isEmpty={payments.byMethod.length === 0}>
          <DistributionPieChart
            data={[...payments.byMethod]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item, index) => ({
                label: item.name,
                count: item.count,
                fill: palette[index % palette.length],
              }))}
          />
        </ChartCard>
      </Col>
      <Col xs={24} md={12} xl={8}>
        <ChartCard title="Hisobotlar turi bo'yicha" isEmpty={reports.byType.length === 0}>
          <TypesRadarChart
            data={toChartData(reports.byType, (name) => REPORT_TYPE_LABELS[name as ReportType])}
            color={token.colorInfo}
          />
        </ChartCard>
      </Col>
      <Col xs={24} md={12} xl={8}>
        <ChartCard
          title="Rollar bo'yicha foydalanuvchilar"
          isEmpty={users.byRole.every((item) => item.count === 0)}
        >
          <RolesRadialChart
            data={users.byRole.map((item) => ({
              name: ROLE_LABELS[item.name as RoleName],
              count: item.count,
              fill: roleColors[item.name as RoleName],
            }))}
          />
        </ChartCard>
      </Col>
    </Row>
  )
}
