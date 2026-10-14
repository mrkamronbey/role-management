import { ArrowLeftOutlined, SendOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router'
import { useMyAccessRequestsQuery } from '@/entities/access-request'
import { getFirstAllowedPath, useUserRoles } from '@/entities/session'
import { RequestAccessButton } from '@/features/access-request-create'
import { LogoutButton } from '@/features/auth/logout'
import { ROLE_LABELS } from '@/shared/config'
import { FullPageLoader, StatusPage } from '@/shared/ui'

export const NoRolesPage = () => {
  const roles = useUserRoles()
  const { data: myRequests, isPending } = useMyAccessRequestsQuery()
  const pendingRequest = myRequests?.find((request) => request.status === 'PENDING')

  if (roles.length > 0) {
    return <Navigate to={getFirstAllowedPath(roles)} replace />
  }

  if (isPending) {
    return <FullPageLoader />
  }

  if (pendingRequest) {
    return (
      <StatusPage
        fullScreen
        icon={<SendOutlined />}
        title="So'rovingiz yuborildi"
        description={`"${ROLE_LABELS[pendingRequest.role]}" bo'limiga kirish so'rovingiz administratorga yuborildi. Administrator ko'rib chiqib tasdiqlagach, tizimga qayta kirib bo'limdan foydalanishingiz mumkin.`}
        actions={
          <LogoutButton type="primary" icon={<ArrowLeftOutlined />}>
            Loginga qaytish
          </LogoutButton>
        }
      />
    )
  }

  return (
    <StatusPage
      fullScreen
      icon={<UserSwitchOutlined />}
      title="Sizga hali rol biriktirilmagan"
      description="Kerakli bo'limga kirish so'rovini yuboring. Administrator tasdiqlagach, bo'lim menyuda paydo bo'ladi."
      actions={
        <>
          <RequestAccessButton />
          <LogoutButton />
        </>
      }
    />
  )
}
