import type { ReactNode } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Typography, theme } from 'antd'

interface InspectorProps {
  title: ReactNode
  onClose: () => void
  children: ReactNode
}

export const Inspector = ({ title, onClose, children }: InspectorProps) => {
  const { token } = theme.useToken()

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex min-h-16 shrink-0 items-center justify-between gap-3 px-6 py-3"
        style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div className="min-w-0 flex-1">
          {typeof title === 'string' ? (
            <Typography.Text strong className="block truncate text-base">
              {title}
            </Typography.Text>
          ) : (
            title
          )}
        </div>
        <Button type="text" size="small" icon={<CloseOutlined />} onClick={onClose} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  )
}
