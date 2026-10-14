import { RoleName } from '../../generated/prisma/enums.js'

export const ASSIGNABLE_ROLES: RoleName[] = [RoleName.PAYMENT, RoleName.REPORTS]

export const ROLE_LABELS: Record<RoleName, string> = {
  ADMIN: 'Administrator',
  PAYMENT: "To'lovlar",
  REPORTS: 'Hisobotlar',
}
