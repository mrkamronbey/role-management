import { AuditOutlined, FileDoneOutlined, TeamOutlined, WalletOutlined } from '@ant-design/icons'
import { Col, Row, Typography, theme } from 'antd'
import { usePendingRequestsQuery } from '@/entities/access-request'
import { PaymentStatusTag, usePaymentsQuery, usePaymentsSummaryQuery } from '@/entities/payment'
import { useReportsQuery } from '@/entities/report'
import { RoleTag } from '@/entities/role'
import { hasAnyRole, useCurrentUser, useUserRoles } from '@/entities/session'
import { getFullName, useUsersQuery } from '@/entities/user'
import { BRAND_COLORS, PAGE_ROLES, ROUTES } from '@/shared/config'
import { formatMoney, formatRelative } from '@/shared/lib/format'
import { PageLayout } from '@/shared/ui'
import { RecentListCard } from './RecentListCard'
import { RecentListItem } from './RecentListItem'
import { StatCard } from './StatCard'

export const DashboardPage = () => {
  const { token } = theme.useToken()
  const user = useCurrentUser()
  const roles = useUserRoles()

  const canSeeUsers = hasAnyRole(roles, PAGE_ROLES.users)
  const canSeeRequests = hasAnyRole(roles, PAGE_ROLES.accessRequests)
  const canSeePayments = hasAnyRole(roles, PAGE_ROLES.payments)
  const canSeeReports = hasAnyRole(roles, PAGE_ROLES.reports)

  const usersQuery = useUsersQuery({ page: 1, limit: 1 }, canSeeUsers)
  const requestsQuery = usePendingRequestsQuery(canSeeRequests)
  const paymentsQuery = usePaymentsQuery({ page: 1, limit: 5 }, canSeePayments)
  const summaryQuery = usePaymentsSummaryQuery({}, canSeePayments)
  const readyReportsQuery = useReportsQuery({ status: 'READY', page: 1, limit: 1 }, canSeeReports)

  const pendingRequests = requestsQuery.data?.items ?? []
  const payments = paymentsQuery.data?.items ?? []

  const stats = [
    {
      visible: canSeeUsers,
      title: 'Foydalanuvchilar',
      value: usersQuery.data?.total ?? '—',
      icon: <TeamOutlined />,
      color: token.colorInfo,
      path: ROUTES.users,
    },
    {
      visible: canSeeRequests,
      title: "Kutilayotgan so'rovlar",
      value: requestsQuery.data?.total ?? '—',
      icon: <AuditOutlined />,
      color: token.colorWarning,
      path: ROUTES.accessRequests,
    },
    {
      visible: canSeePayments,
      title: "Muvaffaqiyatli to'lovlar",
      value: summaryQuery.data ? formatMoney(summaryQuery.data.totalAmount) : '—',
      icon: <WalletOutlined />,
      color: BRAND_COLORS.gold,
      path: ROUTES.payments,
    },
    {
      visible: canSeeReports,
      title: 'Tayyor hisobotlar',
      value: readyReportsQuery.data?.total ?? '—',
      icon: <FileDoneOutlined />,
      color: token.colorSuccess,
      path: ROUTES.reports,
    },
  ].filter((stat) => stat.visible)

  return (
    <PageLayout
      header={
        <Typography.Text type="secondary">
          Xush kelibsiz, {user ? getFullName(user) : ''}
        </Typography.Text>
      }
    >
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col key={stat.title} xs={24} sm={12} xl={6}>
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

      <Row gutter={[16, 16]} className="mt-4">
        {canSeeRequests && (
          <Col xs={24} xl={12}>
            <RecentListCard
              title="Kutilayotgan so'rovlar"
              path={ROUTES.accessRequests}
              emptyText="Yangi so'rovlar yo'q"
              isEmpty={pendingRequests.length === 0}
            >
              {pendingRequests.slice(0, 4).map((request) => (
                <RecentListItem
                  key={request.id}
                  title={getFullName(request.user)}
                  description={formatRelative(request.createdAt)}
                  extra={<RoleTag role={request.role} />}
                />
              ))}
            </RecentListCard>
          </Col>
        )}

        {canSeePayments && (
          <Col xs={24} xl={12}>
            <RecentListCard
              title="So'nggi to'lovlar"
              path={ROUTES.payments}
              emptyText="To'lovlar yo'q"
              isEmpty={payments.length === 0}
            >
              {payments.map((payment) => (
                <RecentListItem
                  key={payment.id}
                  title={payment.payer}
                  description={formatMoney(payment.amount)}
                  extra={<PaymentStatusTag status={payment.status} />}
                />
              ))}
            </RecentListCard>
          </Col>
        )}
      </Row>
    </PageLayout>
  )
}
