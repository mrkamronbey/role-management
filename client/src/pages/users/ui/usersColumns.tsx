import type { TableColumnsType } from 'antd'
import { UserAvatar, getFullName, type User } from '@/entities/user'
import { UserRolesEditor } from '@/features/user-form'
import { formatDate } from '@/shared/lib/format'
import { UserRowActions } from './UserRowActions'

export const getUsersColumns = (onEdit: (user: User) => void): TableColumnsType<User> => [
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
    key: 'roles',
    width: 300,
    render: (_, user) => <UserRolesEditor user={user} />,
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
    render: (_, user) => <UserRowActions user={user} onEdit={onEdit} />,
  },
]
