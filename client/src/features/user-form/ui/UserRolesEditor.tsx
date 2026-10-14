import { MinusCircleOutlined } from '@ant-design/icons'
import { RoleTags } from '@/entities/role'
import { getFullName, type User } from '@/entities/user'
import { ROLES, ROLE_LABELS, type RoleName } from '@/shared/config'
import { useConfirm, useNotify } from '@/shared/lib/hooks'
import { useUpdateUser } from '../api/useUpdateUser'
import { RolesSelect } from './RolesSelect'

export const UserRolesEditor = ({ user }: { user: User }) => {
  const confirm = useConfirm()
  const notify = useNotify()
  const updateUser = useUpdateUser()

  if (user.roles.includes(ROLES.ADMIN)) {
    return <RoleTags roles={user.roles} />
  }

  const roles = updateUser.isPending ? updateUser.variables.dto.roles : user.roles

  const saveRoles = async (nextRoles: RoleName[]) => {
    try {
      await updateUser.mutateAsync({ id: user.id, dto: { roles: nextRoles } })
      notify.success('Rollar yangilandi')
    } catch (error) {
      notify.error(error)
    }
  }

  const handleChange = (nextRoles: RoleName[]) => {
    const removedRole = roles?.find((role) => !nextRoles.includes(role))

    if (!removedRole) {
      saveRoles(nextRoles)
      return
    }

    confirm({
      danger: true,
      icon: <MinusCircleOutlined />,
      title: 'Rolni olib tashlash',
      description: `${getFullName(user)} foydalanuvchisidan "${ROLE_LABELS[removedRole]}" roli olib tashlansinmi?`,
      okText: 'Olib tashlash',
      onOk: () => saveRoles(nextRoles),
    })
  }

  return (
    <RolesSelect
      allowClear={false}
      placeholder="Rol biriktirish"
      value={roles}
      loading={updateUser.isPending}
      onChange={handleChange}
      className="w-full min-w-48"
    />
  )
}
