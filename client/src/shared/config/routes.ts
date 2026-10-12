export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  users: '/users',
  userCreate: '/users/new',
  userEdit: '/users/:id/edit',
  accessRequests: '/access-requests',
  payments: '/payments',
  reports: '/reports',
  forbidden: '/403',
  noRoles: '/no-roles',
}

export const getUserEditPath = (id: number) => `/users/${id}/edit`

export interface RouteHandle {
  title: string
}
