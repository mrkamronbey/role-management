export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  users: '/users',
  accessRequests: '/access-requests',
  payments: '/payments',
  reports: '/reports',
  profile: '/profile',
  forbidden: '/403',
  noRoles: '/no-roles',
}

export interface RouteHandle {
  title: string
}
