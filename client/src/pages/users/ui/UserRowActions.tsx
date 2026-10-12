import { EditOutlined } from '@ant-design/icons'
import { Button, Flex, Tooltip } from 'antd'
import { useNavigate } from 'react-router'
import { PrivateComponent } from '@/entities/session'
import type { User } from '@/entities/user'
import { DeleteUserButton } from '@/features/user-delete'
import { ROLES, getUserEditPath } from '@/shared/config'

export const UserRowActions = ({ user }: { user: User }) => {
  const navigate = useNavigate()

  return (
    <PrivateComponent roles={[ROLES.ADMIN]}>
      <Flex gap={8} onClick={(event) => event.stopPropagation()}>
        <Tooltip title="Tahrirlash">
          <Button icon={<EditOutlined />} onClick={() => navigate(getUserEditPath(user.id))} />
        </Tooltip>
        <DeleteUserButton user={user} />
      </Flex>
    </PrivateComponent>
  )
}
