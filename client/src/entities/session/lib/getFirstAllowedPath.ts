import { NAV_ITEMS, ROUTES, type RoleName } from '@/shared/config'
import { hasAnyRole } from '../model/useHasRole'

export const getFirstAllowedPath = (roles: RoleName[]) => {
  const item = NAV_ITEMS.find((navItem) => hasAnyRole(roles, navItem.roles))
  return item ? item.path : ROUTES.noRoles
}
