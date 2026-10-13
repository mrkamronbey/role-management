import { usePaymentsQuery } from '@/entities/payment'
import { useReportsQuery } from '@/entities/report'
import { hasAnyRole, useUserRoles } from '@/entities/session'
import { getFullName, useUsersQuery } from '@/entities/user'
import { NAV_ITEMS, PAGE_ROLES, ROUTES, getUserEditPath } from '@/shared/config'
import { formatMoney } from '@/shared/lib/format'

const MAX_RESULTS = 5

export type SearchGroupType = 'pages' | 'users' | 'payments' | 'reports'

interface SearchItem {
  key: string
  title: string
  description: string
  path: string
}

interface SearchGroup {
  type: SearchGroupType
  title: string
  items: SearchItem[]
}

export const useGlobalSearch = (query: string) => {
  const roles = useUserRoles()
  const text = query.trim().toLowerCase()
  const hasQuery = text.length >= 2

  const canSeeUsers = hasAnyRole(roles, PAGE_ROLES.users)
  const canSeePayments = hasAnyRole(roles, PAGE_ROLES.payments)
  const canSeeReports = hasAnyRole(roles, PAGE_ROLES.reports)

  const usersQuery = useUsersQuery(
    { search: text, page: 1, limit: MAX_RESULTS },
    hasQuery && canSeeUsers,
  )
  const paymentsQuery = usePaymentsQuery(
    { search: text, page: 1, limit: MAX_RESULTS },
    hasQuery && canSeePayments,
  )
  const reportsQuery = useReportsQuery(
    { search: text, page: 1, limit: MAX_RESULTS },
    hasQuery && canSeeReports,
  )

  const pages = NAV_ITEMS.filter(
    (item) => hasAnyRole(roles, item.roles) && item.label.toLowerCase().includes(text),
  ).map((item) => ({
    key: `page-${item.path}`,
    title: item.label,
    description: "Sahifaga o'tish",
    path: item.path,
  }))

  const users = (usersQuery.data?.items ?? []).map((user) => ({
    key: `user-${user.id}`,
    title: getFullName(user),
    description: user.email,
    path: getUserEditPath(user.id),
  }))

  const payments = (paymentsQuery.data?.items ?? []).map((payment) => ({
    key: `payment-${payment.id}`,
    title: `${payment.receiptNumber} · ${payment.payer}`,
    description: formatMoney(payment.amount),
    path: ROUTES.payments,
  }))

  const reports = (reportsQuery.data?.items ?? []).map((report) => ({
    key: `report-${report.id}`,
    title: report.title,
    description: report.period,
    path: ROUTES.reports,
  }))

  const groups: SearchGroup[] = [
    { type: 'pages', title: 'Sahifalar', items: pages },
    { type: 'users', title: 'Foydalanuvchilar', items: users },
    { type: 'payments', title: "To'lovlar", items: payments },
    { type: 'reports', title: 'Hisobotlar', items: reports },
  ]

  return {
    hasQuery,
    groups: hasQuery ? groups.filter((group) => group.items.length > 0) : [],
    isSearching: usersQuery.isFetching || paymentsQuery.isFetching || reportsQuery.isFetching,
  }
}
