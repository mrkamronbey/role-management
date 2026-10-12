import { Navigate, Outlet } from 'react-router'
import { ROUTES, type RoleName } from '@/shared/config'
import { FullPageLoader } from '@/shared/ui'
import { useSessionStatus, useUserRoles } from '../model/selectors'
import { hasAnyRole } from '../model/useHasRole'

interface PrivateRoutesProps {
  roles?: RoleName[]
}

export const PrivateRoutes = ({ roles }: PrivateRoutesProps) => {
  const status = useSessionStatus()
  const userRoles = useUserRoles()

  if (status === 'loading') {
    return <FullPageLoader />
  }

  if (status === 'guest') {
    return <Navigate to={ROUTES.login} replace />
  }

  if (roles && !hasAnyRole(userRoles, roles)) {
    return <Navigate to={ROUTES.forbidden} replace />
  }

  return <Outlet />
}
