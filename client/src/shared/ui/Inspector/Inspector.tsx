import type { ReactNode } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { useIsMobile } from '../../lib/hooks'

interface InspectorProps {
  title: ReactNode
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export const Inspector = ({ title, onClose, children, footer }: InspectorProps) => {
  const isMobile = useIsMobile()

  return (
    <Drawer
      open
      title={title}
      size={isMobile ? '100%' : 400}
      closable={false}
      extra={<Button type="text" size="small" icon={<CloseOutlined />} onClick={onClose} />}
      footer={footer}
      onClose={onClose}
    >
      {children}
    </Drawer>
  )
}
