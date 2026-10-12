import { Descriptions, Typography } from 'antd'
import { RoleTags } from '@/entities/role'
import { getFullName, type User } from '@/entities/user'
import { formatDateTime } from '@/shared/lib/format'
import { Inspector } from '@/shared/ui'

interface UserInspectorProps {
  user: User
  onClose: () => void
}

export const UserInspector = ({ user, onClose }: UserInspectorProps) => (
  <Inspector
    title={
      <div className="flex flex-row items-center gap-3 text-center">
        <div>
          <Typography.Title level={5} className="mb-0">
            {getFullName(user)}
          </Typography.Title>
        </div>
      </div>
    }
    onClose={onClose}
  >
    <Descriptions
      column={1}
      size="small"
      bordered
      items={[
        { label: 'Ism', children: user.firstName },
        { label: 'Familiya', children: user.lastName },
        { label: 'Email', children: user.email },
        { label: 'Rollar', children: <RoleTags roles={user.roles} /> },
        { label: 'ID', children: `#${user.id}` },
        { label: 'Yaratilgan', children: formatDateTime(user.createdAt) },
      ]}
    />
  </Inspector>
)
