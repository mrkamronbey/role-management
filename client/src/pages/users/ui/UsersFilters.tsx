import { Select } from 'antd'
import { ROLES, ROLE_LABELS, type RoleName } from '@/shared/config'
import { useOptions } from '@/shared/lib/hooks'
import { SearchInput } from '@/shared/ui'

const ALL_ROLES = Object.values(ROLES)

const getRole = (role: RoleName) => role
const getRoleLabel = (role: RoleName) => ROLE_LABELS[role]

interface UsersFiltersProps {
  search: string
  role?: RoleName
  onSearch: (value: string) => void
  onRoleChange: (value?: RoleName) => void
}

export const UsersFilters = ({ search, role, onSearch, onRoleChange }: UsersFiltersProps) => {
  const roleOptions = useOptions(ALL_ROLES, getRole, getRoleLabel)

  return (
    <>
      <SearchInput
        value={search}
        placeholder="Ism yoki email bo'yicha qidirish"
        onSearch={onSearch}
      />
      <Select
        allowClear
        placeholder="Rol bo'yicha"
        options={roleOptions}
        value={role}
        onChange={onRoleChange}
        className="w-44"
      />
    </>
  )
}
