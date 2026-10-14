import type { ReactNode } from 'react'
import { Card, Empty } from 'antd'

interface ChartCardProps {
  title: string
  extra?: ReactNode
  isEmpty?: boolean
  children: ReactNode
}

export const ChartCard = ({ title, extra, isEmpty = false, children }: ChartCardProps) => (
  <Card title={title} extra={extra} className="h-full border-(--ant-color-border)">
    {isEmpty ? <Empty description="Tanlangan davrda ma'lumot yo'q" className="py-12" /> : children}
  </Card>
)
