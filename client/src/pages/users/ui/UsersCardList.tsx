import { Card, Empty, Spin, Typography } from 'antd'
import { RoleTags } from '@/entities/role'
import { UserAvatar, getFullName, type User } from '@/entities/user'
import { formatDate } from '@/shared/lib/format'
import { UserRowActions } from './UserRowActions'

interface UsersCardListProps {
  users: User[]
  loading: boolean
  onSelect: (user: User) => void
}

export const UsersCardList = ({ users, loading, onSelect }: UsersCardListProps) => {
  if (!loading && users.length === 0) {
    return <Empty className="py-10" description="Foydalanuvchilar topilmadi" />
  }

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <Card key={user.id} size="small" hoverable onClick={() => onSelect(user)}>
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
              <RoleTags roles={user.roles} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Typography.Text type="secondary" className="text-xs">
                {formatDate(user.createdAt)}
              </Typography.Text>
              <UserRowActions user={user} />
            </div>
          </Card>
        ))}
      </div>
    </Spin>
  )
}
