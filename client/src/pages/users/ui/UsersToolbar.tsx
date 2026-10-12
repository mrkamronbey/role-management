import { useEffect, useState } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import { useNavigate } from 'react-router'
import { PrivateComponent } from '@/entities/session'
import { ROLES, ROLE_LABELS, ROUTES, type RoleName } from '@/shared/config'
import { useDebouncedValue, useOptions } from '@/shared/lib/hooks'

const ALL_ROLES = Object.values(ROLES)

const getRole = (role: RoleName) => role
const getRoleLabel = (role: RoleName) => ROLE_LABELS[role]

interface UsersToolbarProps {
  search: string
  role?: RoleName
  onSearch: (value: string) => void
  onRoleChange: (value?: RoleName) => void
}

export const UsersToolbar = ({ search, role, onSearch, onRoleChange }: UsersToolbarProps) => {
  const navigate = useNavigate()
  const roleOptions = useOptions(ALL_ROLES, getRole, getRoleLabel)
  const [searchValue, setSearchValue] = useState(search)
  const debouncedSearch = useDebouncedValue(searchValue.trim())

  useEffect(() => {
    if (debouncedSearch !== search) {
      onSearch(debouncedSearch)
    }
  }, [debouncedSearch, search, onSearch])

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Ism yoki email bo'yicha qidirish"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="md:max-w-sm"
      />
      <div className="flex flex-1 gap-3">
        <Select
          allowClear
          placeholder="Rol bo'yicha"
          options={roleOptions}
          value={role}
          onChange={onRoleChange}
          className="flex-1 md:max-w-48"
        />
        <PrivateComponent roles={[ROLES.ADMIN]}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTES.userCreate)}
            className="md:ml-auto"
          >
            Yaratish
          </Button>
        </PrivateComponent>
      </div>
    </div>
  )
}
