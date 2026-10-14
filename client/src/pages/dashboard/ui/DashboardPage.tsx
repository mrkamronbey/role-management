import { AuditOutlined, FileDoneOutlined, TeamOutlined, WalletOutlined } from '@ant-design/icons'
import { Alert, Card, Col, Row, Skeleton, Typography, theme } from 'antd'
import dayjs from 'dayjs'
import { useAnalyticsQuery } from '@/entities/analytics'
import { PaymentStatusTag } from '@/entities/payment'
import { RoleTag } from '@/entities/role'
import { useCurrentUser } from '@/entities/session'
import { getFullName } from '@/entities/user'
import { getErrorMessage } from '@/shared/api'
import { BRAND_COLORS, ROUTES } from '@/shared/config'
import { formatCompactMoney, formatMoney, formatRelative } from '@/shared/lib/format'
import { DateRangeFilter, PageCard } from '@/shared/ui'
import { useDashboardFilters } from '../model/useDashboardFilters'
import { DashboardCharts } from './charts/DashboardCharts'
import { RecentListCard } from './RecentListCard'
import { RecentListItem } from './RecentListItem'
import { StatCard } from './StatCard'

export const DashboardPage = () => {
  const { token } = theme.useToken()
  const user = useCurrentUser()
  const { from, to, setPeriod } = useDashboardFilters()
  const analyticsQuery = useAnalyticsQuery({ from, to })
  const analytics = analyticsQuery.data

  const periodText = analytics
    ? `${dayjs(analytics.period.from).format('DD.MM.YYYY')} – ${dayjs(analytics.period.to).format('DD.MM.YYYY')}`
    : ''

  let content
  if (analyticsQuery.isPending) {
    content = (
      <Card>
        <Skeleton active paragraph={{ rows: 8 }} />
      </Card>
    )
  } else if (analyticsQuery.isError) {
    content = <Alert type="error" showIcon title={getErrorMessage(analyticsQuery.error)} />
  } else {
    const { users, accessRequests, payments, reports } = analyticsQuery.data

    const stats = [
      {
        title: 'Yangi foydalanuvchilar',
        value: users.total,
        icon: <TeamOutlined />,
        color: token.colorInfo,
        path: ROUTES.users,
      },
      {
        title: "Kutilayotgan so'rovlar",
        value: accessRequests.pending,
        icon: <AuditOutlined />,
        color: token.colorWarning,
        path: ROUTES.accessRequests,
      },
      {
        title: "Muvaffaqiyatli to'lovlar",
        value: (
          <span title={formatMoney(payments.totalAmount)}>
            {formatCompactMoney(payments.totalAmount)}
          </span>
        ),
        icon: <WalletOutlined />,
        color: BRAND_COLORS.primary,
        path: ROUTES.payments,
      },
      {
        title: 'Tayyor hisobotlar',
        value: reports.ready,
        icon: <FileDoneOutlined />,
        color: token.colorSuccess,
        path: ROUTES.reports,
      },
    ]

    content = (
      <>
        <Row gutter={[16, 16]}>
          {stats.map((stat) => (
            <Col key={stat.title} xs={12} xl={6}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                path={stat.path}
              />
            </Col>
          ))}
        </Row>

        <div className="mt-4">
          <DashboardCharts analytics={analyticsQuery.data} />
        </div>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} xl={12}>
            <RecentListCard
              title="Kutilayotgan so'rovlar"
              path={ROUTES.accessRequests}
              emptyText="Bu davrda yangi so'rovlar yo'q"
              isEmpty={accessRequests.latest.length === 0}
            >
              {accessRequests.latest.map((request) => (
                <RecentListItem
                  key={request.id}
                  title={getFullName(request.user)}
                  description={formatRelative(request.createdAt)}
                  extra={<RoleTag role={request.role} />}
                />
              ))}
            </RecentListCard>
          </Col>

          <Col xs={24} xl={12}>
            <RecentListCard
              title="So'nggi to'lovlar"
              path={ROUTES.payments}
              emptyText="Bu davrda to'lovlar yo'q"
              isEmpty={payments.latest.length === 0}
            >
              {payments.latest.map((payment) => (
                <RecentListItem
                  key={payment.id}
                  title={payment.payer}
                  description={formatMoney(payment.amount)}
                  extra={<PaymentStatusTag status={payment.status} />}
                />
              ))}
            </RecentListCard>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <PageCard
      title={`Xush kelibsiz, ${user ? getFullName(user) : ''}`}
      extra={<DateRangeFilter from={from} to={to} onChange={setPeriod} />}
      filters={
        periodText && (
          <Typography.Text type="secondary">Ko'rsatilgan davr: {periodText}</Typography.Text>
        )
      }
    >
      {content}
    </PageCard>
  )
}
