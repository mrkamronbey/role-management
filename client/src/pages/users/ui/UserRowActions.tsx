import { EditOutlined } from '@ant-design/icons'
import { Button, Flex, Tooltip } from 'antd'
import { PrivateComponent } from '@/entities/session'
import type { User } from '@/entities/user'
import { DeleteUserButton } from '@/features/user-delete'
import { ROLES } from '@/shared/config'

interface UserRowActionsProps {
  user: User
  onEdit: (user: User) => void
}

export const UserRowActions = ({ user, onEdit }: UserRowActionsProps) => (
  <PrivateComponent roles={[ROLES.ADMIN]}>
    <Flex gap={8}>
      <Tooltip title="Tahrirlash">
        <Button icon={<EditOutlined />} onClick={() => onEdit(user)} />
      </Tooltip>
      <DeleteUserButton user={user} />
    </Flex>
  </PrivateComponent>
)
