import type { TableColumnsType } from 'antd'
import { RoleTags } from '@/entities/role'
import { UserAvatar, getFullName, type User } from '@/entities/user'
import { formatDate } from '@/shared/lib/format'
import { UserRowActions } from './UserRowActions'

export const usersColumns: TableColumnsType<User> = [
  {
    title: 'F.I.Sh',
    key: 'fullName',
    render: (_, user) => (
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <span className="font-medium">{getFullName(user)}</span>
      </div>
    ),
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Rollar',
    dataIndex: 'roles',
    key: 'roles',
    render: (roles: User['roles']) => <RoleTags roles={roles} />,
  },
  {
    title: 'Yaratilgan sana',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: (createdAt: string) => formatDate(createdAt),
  },
  {
    title: 'Amallar',
    key: 'actions',
    width: 120,
    render: (_, user) => <UserRowActions user={user} />,
  },
]
