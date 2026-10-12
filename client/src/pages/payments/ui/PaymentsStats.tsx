import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Typography, theme } from 'antd'
import type { Payment, PaymentStatus } from '@/entities/payment'
import { BRAND_COLORS } from '@/shared/config'
import { formatMoney } from '@/shared/lib/format'

interface PaymentsStatsProps {
  payments: Payment[]
  loading: boolean
}

export const PaymentsStats = ({ payments, loading }: PaymentsStatsProps) => {
  const { token } = theme.useToken()

  const countByStatus = (status: PaymentStatus) =>
    payments.filter((payment) => payment.status === status).length

  const totalAmount = payments
    .filter((payment) => payment.status === 'SUCCESS')
    .reduce((sum, payment) => sum + payment.amount, 0)

  const stats = [
    {
      title: 'Jami summa',
      value: formatMoney(totalAmount),
      icon: <WalletOutlined />,
      color: BRAND_COLORS.gold,
    },
    {
      title: 'Muvaffaqiyatli',
      value: countByStatus('SUCCESS'),
      icon: <CheckCircleOutlined />,
      color: token.colorSuccess,
    },
    {
      title: 'Kutilmoqda',
      value: countByStatus('PENDING'),
      icon: <ClockCircleOutlined />,
      color: token.colorWarning,
    },
    {
      title: 'Rad etilgan',
      value: countByStatus('FAILED'),
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
