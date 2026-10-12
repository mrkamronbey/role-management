import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { RequestAccessButton } from '@/features/access-request-create'
import { ROUTES } from '@/shared/config'
import { PageLayout, ResultPage } from '@/shared/ui'

export const ForbiddenPage = () => {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <ResultPage
        status="403"
        title="403"
        subTitle="Bu sahifaga kirish uchun ruxsatingiz yo'q"
        extra={
          <div className="flex flex-wrap justify-center gap-2">
            <RequestAccessButton />
            <Button type="primary" onClick={() => navigate(ROUTES.home, { replace: true })}>
              Bosh sahifaga
            </Button>
          </div>
        }
      />
    </PageLayout>
  )
}
