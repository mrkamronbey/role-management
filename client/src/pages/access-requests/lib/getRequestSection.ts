import { NAV_ITEMS, type RoleName } from '@/shared/config'

export const getRequestSection = (role: RoleName) =>
  NAV_ITEMS.find((item) => item.group === 'sections' && item.roles.includes(role))
