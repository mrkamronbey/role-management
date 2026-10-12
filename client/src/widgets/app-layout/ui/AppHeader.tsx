import { MenuOutlined } from '@ant-design/icons'
import { Button, Layout, Typography, theme } from 'antd'
import { useMatches } from 'react-router'
import { GlobalSearch } from '@/features/global-search'
import { ThemeToggle } from '@/features/theme-toggle'
import type { RouteHandle } from '@/shared/config'
import { NotificationBell } from './NotificationBell'

interface AppHeaderProps {
  isMobile: boolean
  onMenuClick: () => void
}

export const AppHeader = ({ isMobile, onMenuClick }: AppHeaderProps) => {
  const { token } = theme.useToken()
  const matches = useMatches()
  const currentRoute = matches[matches.length - 1]
  const title = (currentRoute?.handle as RouteHandle | undefined)?.title

  return (
    <Layout.Header
      className="flex items-center justify-between gap-3"
      style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
    >
      {isMobile ? (
        <Button type="text" icon={<MenuOutlined />} onClick={onMenuClick} />
      ) : (
        <Typography.Text strong className="truncate text-lg">
          {title}
        </Typography.Text>
      )}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
        <GlobalSearch />
        <NotificationBell />
        <ThemeToggle />
      </div>
    </Layout.Header>
  )
}
