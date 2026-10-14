import { MailOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { RoleTags } from '@/entities/role'
import type { SessionUser } from '@/entities/session'
import { UserAvatar, getFullName } from '@/entities/user'

export const ProfileHero = ({ user }: { user: SessionUser }) => (
  <div className="flex flex-col gap-5 rounded-2xl bg-(--ant-color-primary-bg) p-6 sm:flex-row sm:items-center">
    <UserAvatar user={user} size={88} shape="square" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <Typography.Title level={3} className="m-0!">
        {getFullName(user)}
      </Typography.Title>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        <Typography.Text type="secondary">
          <MailOutlined className="me-2" />
          {user.email}
        </Typography.Text>
      </div>
      {user.roles.length > 0 ? (
        <RoleTags roles={user.roles} />
      ) : (
        <Typography.Text type="secondary">Hali rol biriktirilmagan</Typography.Text>
      )}
    </div>
  </div>
)
