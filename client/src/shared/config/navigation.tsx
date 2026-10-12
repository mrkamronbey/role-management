import type { ReactNode } from 'react'
import {
  AuditOutlined,
  BarChartOutlined,
  DashboardOutlined,
  TeamOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { ROLES, type RoleName } from './roles'
import { ROUTES } from './routes'

type PageName = 'dashboard' | 'users' | 'accessRequests' | 'payments' | 'reports'

export const PAGE_ROLES: Record<PageName, RoleName[]> = {
  dashboard: [ROLES.ADMIN, ROLES.PAYMENT, ROLES.REPORTS],
  users: [ROLES.ADMIN],
  accessRequests: [ROLES.ADMIN],
  payments: [ROLES.PAYMENT],
  reports: [ROLES.REPORTS],
}

type NavGroup = 'main' | 'management' | 'sections'

export const NAV_GROUPS: { key: NavGroup; label: string }[] = [
  { key: 'main', label: 'Asosiy' },
  { key: 'management', label: 'Boshqaruv' },
  { key: 'sections', label: "Bo'limlar" },
]

interface NavItem {
  path: string
  label: string
  icon: ReactNode
  roles: RoleName[]
  group: NavGroup
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: ROUTES.dashboard,
    label: 'Bosh sahifa',
    icon: <DashboardOutlined />,
    roles: PAGE_ROLES.dashboard,
    group: 'main',
  },
  {
    path: ROUTES.users,
    label: 'Foydalanuvchilar',
    icon: <TeamOutlined />,
    roles: PAGE_ROLES.users,
    group: 'management',
  },
  {
    path: ROUTES.accessRequests,
    label: "Kirish so'rovlari",
    icon: <AuditOutlined />,
    roles: PAGE_ROLES.accessRequests,
    group: 'management',
  },
  {
    path: ROUTES.payments,
    label: "To'lovlar",
    icon: <WalletOutlined />,
    roles: PAGE_ROLES.payments,
    group: 'sections',
  },
  {
    path: ROUTES.reports,
    label: 'Hisobotlar',
    icon: <BarChartOutlined />,
    roles: PAGE_ROLES.reports,
    group: 'sections',
  },
]
