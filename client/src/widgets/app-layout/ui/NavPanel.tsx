import { AppLogo } from './AppLogo'
import { NavMenu } from './NavMenu'

interface NavPanelProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export const NavPanel = ({ collapsed = false, onNavigate }: NavPanelProps) => (
  <div className="flex h-full flex-col">
    <div className="h-16 shrink-0 border-b border-(--ant-color-border-secondary)">
      <AppLogo collapsed={collapsed} />
    </div>
    <div className="flex-1 overflow-y-auto py-2">
      <NavMenu collapsed={collapsed} onNavigate={onNavigate} />
    </div>
  </div>
)
