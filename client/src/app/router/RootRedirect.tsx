import { Navigate } from 'react-router'
import { getFirstAllowedPath, useUserRoles } from '@/entities/session'

export const RootRedirect = () => {
  const roles = useUserRoles()
  return <Navigate to={getFirstAllowedPath(roles)} replace />
}
