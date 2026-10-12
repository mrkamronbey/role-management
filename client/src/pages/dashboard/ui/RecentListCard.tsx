import type { ReactNode } from 'react'
import { Button, Card, Empty } from 'antd'
import { useNavigate } from 'react-router'

interface RecentListCardProps {
  title: string
  path: string
  emptyText: string
  isEmpty: boolean
  children: ReactNode
}

export const RecentListCard = ({
  title,
  path,
  emptyText,
  isEmpty,
  children,
}: RecentListCardProps) => {
  const navigate = useNavigate()

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={() => navigate(path)}>
          Barchasi
        </Button>
      }
      className="h-full"
    >
      {isEmpty ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </Card>
  )
}
