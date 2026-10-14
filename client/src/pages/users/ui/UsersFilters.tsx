import { Select } from 'antd'
import { ROLE_LABELS, type RoleName } from '@/shared/config'
import { toOptions } from '@/shared/lib/options'
import { SearchInput } from '@/shared/ui'

const roleOptions = toOptions(ROLE_LABELS)

interface UsersFiltersProps {
  search: string
  role?: RoleName
  onSearch: (value: string) => void
  onRoleChange: (value?: RoleName) => void
}

export const UsersFilters = ({ search, role, onSearch, onRoleChange }: UsersFiltersProps) => (
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
