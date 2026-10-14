import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Typography, type MenuProps } from 'antd'
import { useNavigate } from 'react-router'
import { useCurrentUser } from '@/entities/session'
import { UserAvatar, getFullName } from '@/entities/user'
import { useLogout } from '@/features/auth/logout'
import { ROLE_LABELS, ROUTES } from '@/shared/config'

export const UserMenu = () => {
  const user = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const roleLabel = user.roles.length > 0 ? ROLE_LABELS[user.roles[0]] : "Rol yo'q"

  const items: MenuProps['items'] = [
    {
      key: 'info',
      type: 'group',
      label: (
        <div className="py-1">
          <Typography.Text strong className="block">
            {getFullName(user)}
          </Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {user.email}
          </Typography.Text>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: 'Profil',
      icon: <UserOutlined />,
      onClick: () => navigate(ROUTES.profile),
    },
    { key: 'logout', label: 'Chiqish', icon: <LogoutOutlined />, danger: true, onClick: logout },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <div className="flex min-w-0 cursor-pointer items-center gap-3 ps-2">
        <UserAvatar user={user} shape="square" size={36} />
        <div className="hidden max-w-48 min-w-0 leading-tight sm:block">
          <Typography.Text strong className="block truncate">
            {getFullName(user)}
          </Typography.Text>
          <Typography.Text type="secondary" className="block truncate text-xs">
            {roleLabel}
          </Typography.Text>
        </div>
        <DownOutlined className="text-xs opacity-50" />
      </div>
    </Dropdown>
  )
}
