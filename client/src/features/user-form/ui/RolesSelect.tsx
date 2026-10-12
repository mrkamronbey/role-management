import { Select, type SelectProps } from 'antd'
import { useRolesQuery, type Role } from '@/entities/role'
import { ROLES, ROLE_LABELS } from '@/shared/config'
import { useOptions } from '@/shared/lib/hooks'

const getRoleName = (role: Role) => role.name
const getRoleLabel = (role: Role) => ROLE_LABELS[role.name]

export const RolesSelect = (props: SelectProps) => {
  const { data: roles, isLoading } = useRolesQuery()
  const options = useOptions(roles, getRoleName, getRoleLabel)

  return (
    <Select
      mode="multiple"
      allowClear
      placeholder="Rollarni tanlang"
      loading={isLoading}
      options={options.filter((option) => option.value !== ROLES.ADMIN)}
      {...props}
    />
  )
}
