import { Descriptions, Modal, Typography } from 'antd'
import { RoleTags } from '@/entities/role'
import type { SessionUser } from '@/entities/session'
import { UserAvatar, getFullName } from '@/entities/user'

interface ProfileModalProps {
  user: SessionUser
  open: boolean
  onClose: () => void
}

export const ProfileModal = ({ user, open, onClose }: ProfileModalProps) => (
  <Modal title="Profil" open={open} onCancel={onClose} footer={null}>
    <div className="flex items-center gap-4 py-4">
      <UserAvatar user={user} size={56} shape="square" />
      <div>
        <Typography.Text strong className="block text-lg">
          {getFullName(user)}
        </Typography.Text>
        <Typography.Text type="secondary">{user.email}</Typography.Text>
      </div>
    </div>
    <Descriptions
      column={1}
      bordered
      size="small"
      items={[
        { label: 'Ism', children: user.firstName },
        { label: 'Familiya', children: user.lastName },
        { label: 'Email', children: user.email },
        {
          label: 'Rollar',
          children: <RoleTags roles={user.roles} />,
        },
      ]}
    />
  </Modal>
)
