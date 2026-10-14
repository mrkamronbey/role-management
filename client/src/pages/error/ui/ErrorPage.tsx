import { HomeOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { StatusPage } from '@/shared/ui'

export const ErrorPage = () => (
  <StatusPage
    fullScreen
    code="500"
    icon={<WarningOutlined />}
    title="Kutilmagan xatolik"
    description="Nimadir noto'g'ri ketdi. Sahifani qayta yuklab ko'ring."
    actions={
      <>
        <Button icon={<HomeOutlined />} href="/">
          Bosh sahifaga
        </Button>
        <Button type="primary" icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
          Qayta yuklash
        </Button>
      </>
    }
  />
)
