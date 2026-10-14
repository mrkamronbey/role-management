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
    export: '/payments/export',
    receipt: (id: number) => `/payments/${id}/receipt`,
  },
  reports: {
    list: '/reports',
    download: (id: number) => `/reports/${id}/download`,
  },
  analytics: '/analytics',
  accessRequests: {
    list: '/access-requests',
    my: '/access-requests/my',
    approve: (id: number) => `/access-requests/${id}/approve`,
    reject: (id: number) => `/access-requests/${id}/reject`,
  },
} as const
