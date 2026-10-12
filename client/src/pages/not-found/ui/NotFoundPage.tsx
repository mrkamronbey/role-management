import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/shared/config'
import { ResultPage } from '@/shared/ui'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <ResultPage
      fullScreen
      status="404"
      title="404"
      subTitle="Siz qidirgan sahifa topilmadi"
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.home, { replace: true })}>
          Bosh sahifaga
        </Button>
      }
    />
  )
}
