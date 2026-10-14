import { ArrowLeftOutlined, CompassOutlined, HomeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/shared/config'
import { StatusPage } from '@/shared/ui'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <StatusPage
      fullScreen
      code="404"
      icon={<CompassOutlined />}
      title="Sahifa topilmadi"
      description="Siz qidirgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan."
      actions={
        <>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Orqaga
          </Button>
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
  )
}
