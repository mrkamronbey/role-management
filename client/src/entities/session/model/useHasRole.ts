import { ROLES, type RoleName } from '@/shared/config'
import { useUserRoles } from './selectors'

export const hasAnyRole = (userRoles: RoleName[], roles: RoleName[]) =>
  userRoles.includes(ROLES.ADMIN) || roles.some((role) => userRoles.includes(role))

export const useHasRole = (roles: RoleName[]) => {
  const userRoles = useUserRoles()
  return hasAnyRole(userRoles, roles)
}
