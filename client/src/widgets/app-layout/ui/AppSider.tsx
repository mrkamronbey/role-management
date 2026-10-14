import { Layout, theme } from 'antd'
import { NavPanel } from './NavPanel'

interface AppSiderProps {
  collapsed: boolean
}

export const AppSider = ({ collapsed }: AppSiderProps) => {
  const { token } = theme.useToken()

  return (
    <Layout.Sider
      width={248}
      collapsedWidth={80}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="h-screen"
      style={{ borderRight: `1px solid ${token.colorBorderSecondary}` }}
    >
      <NavPanel collapsed={collapsed} />
    </Layout.Sider>
  )
}
