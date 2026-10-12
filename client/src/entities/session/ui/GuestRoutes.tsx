import { Navigate, Outlet } from 'react-router'
import { getFirstAllowedPath } from '../lib/getFirstAllowedPath'
import { useSessionStatus, useUserRoles } from '../model/selectors'

export const GuestRoutes = () => {
  const status = useSessionStatus()
  const roles = useUserRoles()

  if (status === 'authenticated') {
    return <Navigate to={getFirstAllowedPath(roles)} replace />
  }

  return <Outlet />
}
