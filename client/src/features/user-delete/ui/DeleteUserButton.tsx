import { DeleteOutlined } from '@ant-design/icons'
import { App, Button, Popconfirm, Tooltip } from 'antd'
import { useCurrentUser } from '@/entities/session'
import { getFullName, type User } from '@/entities/user'
import { getErrorMessage } from '@/shared/api'
import { ROLES } from '@/shared/config'
import { useDeleteUser } from '../api/useDeleteUser'

export const DeleteUserButton = ({ user }: { user: User }) => {
  const currentUser = useCurrentUser()
  const { message } = App.useApp()
  const deleteUser = useDeleteUser()

  if (user.id === currentUser?.id || user.roles.includes(ROLES.ADMIN)) {
    const reason =
      user.id === currentUser?.id
        ? "O'zingizni o'chira olmaysiz"
        : "Administratorni o'chirib bo'lmaydi"

    return (
      <Tooltip title={reason}>
        <Button danger icon={<DeleteOutlined />} disabled />
      </Tooltip>
    )
  }

  const handleDelete = async () => {
    try {
      await deleteUser.mutateAsync(user.id)
      message.success("Foydalanuvchi o'chirildi")
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <Popconfirm
      title={`${getFullName(user)} o'chirilsinmi?`}
      okText="O'chirish"
      cancelText="Bekor qilish"
      okButtonProps={{ danger: true }}
      onConfirm={handleDelete}
    >
      <Button danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
