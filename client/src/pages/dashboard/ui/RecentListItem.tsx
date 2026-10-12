import type { ReactNode } from 'react'
import { Typography } from 'antd'

interface RecentListItemProps {
  title: string
  description: string
  extra: ReactNode
}

export const RecentListItem = ({ title, description, extra }: RecentListItemProps) => (
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0">
      <Typography.Text strong className="block truncate">
        {title}
      </Typography.Text>
      <Typography.Text type="secondary" className="text-xs">
        {description}
      </Typography.Text>
    </div>
    {extra}
  </div>
)
