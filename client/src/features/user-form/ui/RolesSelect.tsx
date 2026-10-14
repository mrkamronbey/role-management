import { Select, type SelectProps } from 'antd'
import { RoleTag, useRolesQuery, type Role } from '@/entities/role'
import { ROLES, ROLE_LABELS, type RoleName } from '@/shared/config'
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
      tagRender={({ value, closable, onClose }) => (
        <RoleTag
          role={value as RoleName}
          closable={closable}
          onClose={(event) => {
            event.preventDefault()
            onClose()
          }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          className="me-1"
        />
      )}
      {...props}
    />
  )
}
