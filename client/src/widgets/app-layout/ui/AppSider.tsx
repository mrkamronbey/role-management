import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import { NavPanel } from './NavPanel'

interface AppSiderProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export const AppSider = ({ collapsed, onToggleCollapse }: AppSiderProps) => {
  const { token } = theme.useToken()

  return (
    <Layout.Sider
      width={248}
      collapsedWidth={80}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="relative h-screen"
      style={{ borderRight: `1px solid ${token.colorBorderSecondary}` }}
    >
      <NavPanel collapsed={collapsed} />
      <Button
        shape="circle"
        size="small"
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={onToggleCollapse}
        className="absolute top-16 right-0 z-10 translate-x-1/2 -translate-y-1/2"
      />
    </Layout.Sider>
  )
}
