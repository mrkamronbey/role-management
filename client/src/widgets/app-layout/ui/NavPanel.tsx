import { theme } from 'antd'
import { AppLogo } from './AppLogo'
import { NavMenu } from './NavMenu'
import { UserMenu } from './UserMenu'

interface NavPanelProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export const NavPanel = ({ collapsed = false, onNavigate }: NavPanelProps) => {
  const { token } = theme.useToken()
  const border = `1px solid ${token.colorBorderSecondary}`

  return (
    <div className="flex h-full flex-col">
      <div className="h-16 shrink-0" style={{ borderBottom: border }}>
        <AppLogo collapsed={collapsed} />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <NavMenu collapsed={collapsed} onNavigate={onNavigate} />
      </div>
      <div className="flex h-16 shrink-0 items-center px-3" style={{ borderTop: border }}>
        <UserMenu collapsed={collapsed} />
      </div>
    </div>
  )
}
