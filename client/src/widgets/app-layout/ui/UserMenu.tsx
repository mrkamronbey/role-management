import { useState } from 'react'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Typography, type MenuProps } from 'antd'
import { useCurrentUser } from '@/entities/session'
import { UserAvatar, getFullName } from '@/entities/user'
import { useLogout } from '@/features/auth/logout'
import { ROLE_LABELS } from '@/shared/config'
import { ProfileModal } from './ProfileModal'

export const UserMenu = ({ collapsed = false }: { collapsed?: boolean }) => {
  const user = useCurrentUser()
  const logout = useLogout()
  const [profileOpen, setProfileOpen] = useState(false)

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
      onClick: () => setProfileOpen(true),
    },
    { key: 'logout', label: 'Chiqish', icon: <LogoutOutlined />, danger: true, onClick: logout },
  ]

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']} placement="topLeft">
        <div className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-3">
          <UserAvatar user={user} shape="square" size={36} />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1 leading-tight">
                <Typography.Text strong className="block truncate">
                  {getFullName(user)}
                </Typography.Text>
                <Typography.Text type="secondary" className="block truncate text-xs">
                  {roleLabel}
                </Typography.Text>
              </div>
              <DownOutlined className="text-xs opacity-50" />
            </>
          )}
        </div>
      </Dropdown>
      <ProfileModal user={user} open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}
