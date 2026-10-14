import { Layout } from 'antd'
import { NavPanel } from './NavPanel'

interface AppSiderProps {
  collapsed: boolean
}

export const AppSider = ({ collapsed }: AppSiderProps) => (
  <Layout.Sider
    width={248}
    collapsedWidth={80}
    collapsible
    collapsed={collapsed}
    trigger={null}
    className="h-screen border-r border-(--ant-color-border-secondary)"
  >
    <NavPanel collapsed={collapsed} />
  </Layout.Sider>
)
