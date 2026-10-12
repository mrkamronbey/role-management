import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { NAV_ITEMS } from '@/shared/config'
import { useNavItems } from '../lib/useNavItems'

interface NavMenuProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export const NavMenu = ({ collapsed = false, onNavigate }: NavMenuProps) => {
  const items = useNavItems(collapsed)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const selectedKey = NAV_ITEMS.find((item) => pathname.startsWith(item.path))?.path

  return (
    <Menu
      mode="inline"
      inlineIndent={16}
      className="border-e-0"
      items={items}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onClick={({ key }) => {
        navigate(key)
        onNavigate?.()
      }}
    />
  )
}
