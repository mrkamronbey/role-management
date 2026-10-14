import type { ReactNode } from 'react'
import { Card, Typography } from 'antd'
import { useNavigate } from 'react-router'

interface StatCardProps {
  title: string
  value: ReactNode
  icon: ReactNode
  color: string
  path: string
}

export const StatCard = ({ title, value, icon, color, path }: StatCardProps) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(path)} className="h-full cursor-pointer">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <Typography.Text type="secondary" className="block text-sm">
            {title}
          </Typography.Text>
          <Typography.Text strong className="block truncate text-xl">
            {value}
          </Typography.Text>
        </div>
      </div>
    </Card>
  )
}
