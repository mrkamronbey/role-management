import type { ComponentType } from 'react'
import { PAGE_ROLES, ROUTES, type RoleName } from '@/shared/config'

interface ProtectedRoute {
  path: string
  title: string
  roles?: RoleName[]
  lazy: () => Promise<{ Component: ComponentType }>
}

export const protectedRoutes: ProtectedRoute[] = [
  {
    path: ROUTES.dashboard,
    title: 'Bosh sahifa',
    roles: PAGE_ROLES.dashboard,
    lazy: () => import('@/pages/dashboard'),
  },
  {
    path: ROUTES.profile,
    title: 'Profil',
    lazy: () => import('@/pages/profile'),
  },
  {
    path: ROUTES.forbidden,
    title: "Ruxsat yo'q",
    lazy: () => import('@/pages/forbidden'),
  },
  {
    path: ROUTES.users,
    title: 'Foydalanuvchilar',
    roles: PAGE_ROLES.users,
    lazy: () => import('@/pages/users'),
  },
  {
    path: ROUTES.accessRequests,
    title: "Kirish so'rovlari",
    roles: PAGE_ROLES.accessRequests,
    lazy: () => import('@/pages/access-requests'),
  },
  {
    path: ROUTES.payments,
    title: "To'lovlar",
    roles: PAGE_ROLES.payments,
    lazy: () => import('@/pages/payments'),
  },
  {
    path: ROUTES.reports,
    title: 'Hisobotlar',
    roles: PAGE_ROLES.reports,
    lazy: () => import('@/pages/reports'),
  },
]
