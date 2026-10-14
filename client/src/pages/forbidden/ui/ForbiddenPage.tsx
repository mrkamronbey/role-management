import { HomeOutlined, LockOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { RequestAccessButton } from '@/features/access-request-create'
import { ROUTES } from '@/shared/config'
import { PageCard, StatusPage } from '@/shared/ui'

export const ForbiddenPage = () => {
  const navigate = useNavigate()

  return (
    <PageCard>
      <StatusPage
        code="403"
        icon={<LockOutlined />}
        title="Kirish taqiqlangan"
        description="Bu bo'limga kirish uchun sizda kerakli rol yo'q. Administratorga kirish so'rovini yuborishingiz mumkin."
        actions={
          <>
            <RequestAccessButton />
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate(ROUTES.home, { replace: true })}
            >
              Bosh sahifaga
            </Button>
          </>
        }
      />
    </PageCard>
  )
}
