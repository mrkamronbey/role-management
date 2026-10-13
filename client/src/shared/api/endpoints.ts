export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    me: '/auth/me',
  },
  users: {
    list: '/users',
    byId: (id: number) => `/users/${id}`,
  },
  roles: '/roles',
  payments: {
    list: '/payments',
    summary: '/payments/summary',
  },
  reports: '/reports',
  accessRequests: {
    list: '/access-requests',
    approve: (id: number) => `/access-requests/${id}/approve`,
    reject: (id: number) => `/access-requests/${id}/reject`,
  },
} as const
