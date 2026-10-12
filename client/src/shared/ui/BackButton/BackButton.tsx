import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router'

export const BackButton = ({ to }: { to: string }) => {
  const navigate = useNavigate()

  return (
    <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(to)} className="px-0">
      Orqaga
    </Button>
  )
}
