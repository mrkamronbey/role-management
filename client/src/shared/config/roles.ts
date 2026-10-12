export const ROLES = {
  ADMIN: 'ADMIN',
  PAYMENT: 'PAYMENT',
  REPORTS: 'REPORTS',
} as const

export type RoleName = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_LABELS: Record<RoleName, string> = {
  ADMIN: 'Administrator',
  PAYMENT: "To'lovlar",
  REPORTS: 'Hisobotlar',
}

export const ROLE_COLORS: Record<RoleName, string> = {
  ADMIN: 'red',
  PAYMENT: 'green',
  REPORTS: 'blue',
}
