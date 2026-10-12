import { Navigate } from 'react-router'
import { getFirstAllowedPath, useUserRoles } from '@/entities/session'
import { RequestAccessButton } from '@/features/access-request-create'
import { LogoutButton } from '@/features/auth/logout'
import { ResultPage } from '@/shared/ui'

export const NoRolesPage = () => {
  const roles = useUserRoles()

  if (roles.length > 0) {
    return <Navigate to={getFirstAllowedPath(roles)} replace />
  }

  return (
    <ResultPage
      fullScreen
      status="info"
      title="Sizga hali rol biriktirilmagan"
      subTitle="Kerakli bo'limga kirish so'rovini yuboring, administrator ko'rib chiqadi"
      extra={
        <div className="flex flex-wrap justify-center gap-2">
          <RequestAccessButton />
          <LogoutButton />
        </div>
      }
    />
  )
}
