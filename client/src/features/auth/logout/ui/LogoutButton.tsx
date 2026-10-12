import { LogoutOutlined } from '@ant-design/icons'
import { Button, type ButtonProps } from 'antd'
import { useLogout } from '../model/useLogout'

export const LogoutButton = (props: Omit<ButtonProps, 'onClick'>) => {
  const logout = useLogout()

  return (
    <Button icon={<LogoutOutlined />} onClick={logout} {...props}>
      Chiqish
    </Button>
  )
}
