import type { ReactNode } from 'react'
import { Card } from 'antd'
import { useIsMobile } from '../../lib/hooks'

const EXTRA_CLASS =
  'flex flex-wrap items-center justify-end gap-2 [&>.ant-input-affix-wrapper]:grow'

const MOBILE_EXTRA_CLASS = [
  '[&>.ant-input-affix-wrapper]:basis-full',
  '[&>.ant-picker-range]:order-last [&>.ant-picker-range]:basis-full',
  '[&>.ant-select]:min-w-32 [&>.ant-select]:flex-1',
  '[&>.ant-picker]:min-w-32 [&>.ant-picker]:flex-1',
].join(' ')

interface PageCardProps {
  title?: ReactNode
  extra?: ReactNode
  filters?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export const PageCard = ({ title, extra, filters, footer, children }: PageCardProps) => {
  const isMobile = useIsMobile()
  const padding = isMobile ? 16 : 24

  return (
    <div className="h-full p-3 md:p-4">
      <Card
        variant="borderless"
        title={title}
        extra={
          extra && (
            <div className={`${EXTRA_CLASS} ${isMobile ? MOBILE_EXTRA_CLASS : ''}`}>{extra}</div>
          )
        }
        actions={footer ? [footer] : undefined}
        className="flex h-full flex-col [&>.ant-card-head_.ant-card-extra]:ms-0 [&>.ant-card-head_.ant-card-extra]:flex-auto [&>.ant-card-head_.ant-card-head-wrapper]:flex-wrap [&>.ant-card-head_.ant-card-head-wrapper]:gap-3"
        styles={{
          header: {
            borderBottom: 'none',
            fontSize: isMobile ? 17 : 20,
            padding: `${padding}px ${padding}px 0`,
            minHeight: 0,
          },
          title: { flex: '0 0 auto' },
          body: {
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingTop: title || extra ? 16 : padding,
            paddingInline: padding,
            paddingBottom: footer ? 4 : padding,
          },
          actions: { padding: `0 ${padding}px 12px`, borderTop: 'none' },
        }}
      >
        {filters}
        <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-none">
          {children}
        </div>
      </Card>
    </div>
  )
}
