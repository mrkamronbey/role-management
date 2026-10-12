import { Drawer } from 'antd'
import { NavPanel } from './NavPanel'

interface MobileNavDrawerProps {
  open: boolean
  onClose: () => void
}

export const MobileNavDrawer = ({ open, onClose }: MobileNavDrawerProps) => (
  <Drawer
    open={open}
    onClose={onClose}
    placement="left"
    size={260}
    closable={false}
    styles={{ body: { padding: 0 } }}
  >
    <NavPanel onNavigate={onClose} />
  </Drawer>
)
