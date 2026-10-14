import type { ReactNode } from 'react'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Card, Col, Progress, Row, Skeleton, Typography, theme } from 'antd'
import type { PaymentsSummary } from '@/entities/payment'
import { BRAND_COLORS } from '@/shared/config'
import { formatMoney } from '@/shared/lib/format'
import { useIsMobile } from '@/shared/lib/hooks'

interface PaymentsStatsProps {
  summary?: PaymentsSummary
  loading: boolean
}

interface StatCardProps {
  title: string
  value: ReactNode
  icon: ReactNode
  color: string
  extra?: ReactNode
  loading: boolean
  compact?: boolean
}

const StatCard = ({ title, value, icon, color, extra, loading, compact }: StatCardProps) => (
  <Card
    size="small"
    className="h-full border-(--ant-color-border)"
    styles={{ body: { padding: '10px 12px' } }}
  >
    <div className="flex items-center gap-3">
      {!compact && (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-base"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <Typography.Text type="secondary" ellipsis className="block text-xs">
          {title}
        </Typography.Text>
        <div className="text-base font-semibold whitespace-nowrap">
          {loading ? <Skeleton.Input active size="small" /> : value}
        </div>
      </div>
      {!compact && extra}
    </div>
  </Card>
)

export const PaymentsStats = ({ summary, loading }: PaymentsStatsProps) => {
  const { token } = theme.useToken()
  const isMobile = useIsMobile()
  const success = summary?.success ?? 0
  const pending = summary?.pending ?? 0
  const failed = summary?.failed ?? 0
  const total = success + pending + failed

  const share = (count: number) => (total > 0 ? Math.round((count / total) * 100) : 0)

  const statuses = [
    {
      title: 'Muvaffaqiyatli',
      count: success,
      icon: <CheckCircleOutlined />,
      color: token.colorSuccess,
    },
    {
      title: 'Kutilmoqda',
      count: pending,
      icon: <ClockCircleOutlined />,
      color: token.colorWarning,
    },
    { title: 'Rad etilgan', count: failed, icon: <CloseCircleOutlined />, color: token.colorError },
  ]

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={12} xl={6}>
        <StatCard
          title={`Jami summa · ${total} ta to'lov`}
          value={formatMoney(summary?.totalAmount ?? 0)}
          icon={<WalletOutlined />}
          color={BRAND_COLORS.primary}
          loading={loading}
        />
      </Col>
      {statuses.map((status) => (
        <Col key={status.title} xs={8} sm={12} xl={6}>
          <StatCard
            compact={isMobile}
            title={status.title}
            value={status.count}
            icon={status.icon}
            color={status.color}
            loading={loading}
            extra={
              <Progress
                type="circle"
                size={38}
                percent={share(status.count)}
                strokeColor={status.color}
              />
            }
          />
        </Col>
      ))}
    </Row>
  )
}
