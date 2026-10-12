import { useState } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router'
import { useIsMobile } from '@/shared/lib/hooks'
import { AppHeader } from './AppHeader'
import { AppSider } from './AppSider'
import { MobileNavDrawer } from './MobileNavDrawer'

export const AppLayout = () => {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Layout className="h-screen overflow-hidden">
      {isMobile ? (
        <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      ) : (
        <AppSider collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
      )}
      <Layout className="min-w-0">
        <AppHeader isMobile={isMobile} onMenuClick={() => setDrawerOpen(true)} />
        <Layout.Content className="min-h-0 flex-1">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
