import { Card, Spin, Typography } from 'antd'
import { UserAvatar, getFullName, type User } from '@/entities/user'
import { UserRolesEditor } from '@/features/user-form'
import { formatDate } from '@/shared/lib/format'
import { EmptyState } from '@/shared/ui'
import { UserRowActions } from './UserRowActions'

interface UsersCardListProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
}

export const UsersCardList = ({ users, loading, onEdit }: UsersCardListProps) => {
  if (!loading && users.length === 0) {
    return <EmptyState description="Foydalanuvchilar topilmadi" />
  }

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <Card key={user.id} size="small">
            <div className="flex items-start gap-3">
              <UserAvatar user={user} size="large" />
              <div className="min-w-0 flex-1">
                <Typography.Text strong className="block truncate">
                  {getFullName(user)}
                </Typography.Text>
                <Typography.Text type="secondary" className="block truncate text-sm">
                  {user.email}
                </Typography.Text>
              </div>
            </div>
            <div className="mt-3">
              <UserRolesEditor user={user} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Typography.Text type="secondary" className="text-xs">
                {formatDate(user.createdAt)}
              </Typography.Text>
              <UserRowActions user={user} onEdit={onEdit} />
            </div>
          </Card>
        ))}
      </div>
    </Spin>
  )
}
