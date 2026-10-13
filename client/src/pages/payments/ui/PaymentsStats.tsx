import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Typography, theme } from 'antd'
import type { PaymentsSummary } from '@/entities/payment'
import { BRAND_COLORS } from '@/shared/config'
import { formatMoney } from '@/shared/lib/format'

interface PaymentsStatsProps {
  summary?: PaymentsSummary
  loading: boolean
}

export const PaymentsStats = ({ summary, loading }: PaymentsStatsProps) => {
  const { token } = theme.useToken()

  const stats = [
    {
      title: 'Jami summa',
      value: formatMoney(summary?.totalAmount ?? 0),
      icon: <WalletOutlined />,
      color: BRAND_COLORS.primary,
    },
    {
      title: 'Muvaffaqiyatli',
      value: summary?.success ?? 0,
      icon: <CheckCircleOutlined />,
      color: token.colorSuccess,
    },
    {
      title: 'Kutilmoqda',
      value: summary?.pending ?? 0,
      icon: <ClockCircleOutlined />,
      color: token.colorWarning,
    },
    {
      title: 'Rad etilgan',
      value: summary?.failed ?? 0,
      icon: <CloseCircleOutlined />,
      color: token.colorError,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {stats.map((stat) => (
        <div key={stat.title} className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-base"
            style={{ color: stat.color, backgroundColor: `${stat.color}1A` }}
          >
            {stat.icon}
          </div>
          <div className="leading-tight">
            <Typography.Text type="secondary" className="block text-xs">
              {stat.title}
            </Typography.Text>
            <Typography.Text strong className="text-base">
              {loading ? '—' : stat.value}
            </Typography.Text>
          </div>
        </div>
      ))}
    </div>
  )
}
