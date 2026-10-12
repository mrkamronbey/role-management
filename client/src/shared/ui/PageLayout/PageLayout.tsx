import type { ReactNode } from 'react'
import { Drawer, theme } from 'antd'
import { useIsMobile } from '../../lib/hooks'

interface PageLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  inspector?: ReactNode
  onInspectorClose?: () => void
  children: ReactNode
}

export const PageLayout = ({
  header,
  footer,
  inspector,
  onInspectorClose,
  children,
}: PageLayoutProps) => {
  const { token } = theme.useToken()
  const isMobile = useIsMobile()
  const border = `1px solid ${token.colorBorderSecondary}`
  const background = token.colorBgContainer

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col">
        {header && (
          <div
            className="flex min-h-16 shrink-0 items-center px-4 py-2 md:px-6"
            style={{ background, borderBottom: border }}
          >
            <div className="w-full">{header}</div>
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</main>

        {footer && (
          <div
            className="flex h-16 shrink-0 items-center px-4 md:px-6"
            style={{ background, borderTop: border }}
          >
            <div className="w-full">{footer}</div>
          </div>
        )}
      </div>

      {!isMobile && inspector && (
        <div className="w-96 shrink-0" style={{ background, borderLeft: border }}>
          {inspector}
        </div>
      )}

      {isMobile && (
        <Drawer
          open={Boolean(inspector)}
          onClose={onInspectorClose}
          placement="right"
          size={360}
          closable={false}
          styles={{ body: { padding: 0 } }}
        >
          {inspector}
        </Drawer>
      )}
    </div>
  )
}
