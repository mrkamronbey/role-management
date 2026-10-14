import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useCurrentUser } from '@/entities/session'
import { getFullName, type User } from '@/entities/user'
import { ROLES } from '@/shared/config'
import { useConfirm, useNotify } from '@/shared/lib/hooks'
import { useDeleteUser } from '../api/useDeleteUser'

export const DeleteUserButton = ({ user }: { user: User }) => {
  const currentUser = useCurrentUser()
  const confirm = useConfirm()
  const notify = useNotify()
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
      notify.success("Foydalanuvchi o'chirildi")
    } catch (error) {
      notify.error(error)
    }
  }

  const confirmDelete = () =>
    confirm({
      danger: true,
      icon: <DeleteOutlined />,
      title: "Foydalanuvchini o'chirish",
      description: `${getFullName(user)} tizimdan butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.`,
      okText: "O'chirish",
      onOk: handleDelete,
    })

  return (
    <Tooltip title="O'chirish">
      <Button
        danger
        icon={<DeleteOutlined />}
        loading={deleteUser.isPending}
        onClick={confirmDelete}
      />
    </Tooltip>
  )
}
