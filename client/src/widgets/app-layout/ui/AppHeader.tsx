import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Typography } from 'antd'
import { useMatches } from 'react-router'
import { ThemeToggle } from '@/features/theme-toggle'
import type { RouteHandle } from '@/shared/config'
import { UserMenu } from './UserMenu'

interface AppHeaderProps {
  isMobile: boolean
  collapsed: boolean
  onMenuClick: () => void
}

export const AppHeader = ({ isMobile, collapsed, onMenuClick }: AppHeaderProps) => {
  const matches = useMatches()
  const title = (matches[matches.length - 1]?.handle as RouteHandle | undefined)?.title

  let menuIcon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
  if (isMobile) {
    menuIcon = <MenuOutlined />
  }

  return (
    <Layout.Header className="flex items-center justify-between gap-3 border-b border-(--ant-color-border-secondary)">
      <Button type="text" aria-label="Menyu" icon={menuIcon} onClick={onMenuClick} />
      <Typography.Title
        level={4}
        ellipsis
        className="m-0! min-w-0 flex-1"
        style={{ fontSize: isMobile ? 16 : 20 }}
      >
        {title}
      </Typography.Title>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </Layout.Header>
  )
}
