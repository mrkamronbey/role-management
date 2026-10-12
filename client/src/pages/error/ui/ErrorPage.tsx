import { Button } from 'antd'
import { ResultPage } from '@/shared/ui'

export const ErrorPage = () => (
  <ResultPage
    fullScreen
    status="500"
    title="Kutilmagan xatolik"
    subTitle="Sahifani qayta yuklab ko'ring"
    extra={
      <Button type="primary" onClick={() => window.location.reload()}>
        Qayta yuklash
      </Button>
    }
  />
)
