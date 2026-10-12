import { Typography } from 'antd'
import type { RoleName } from '@/shared/config'
import { RoleTag } from './RoleTag'

export const RoleTags = ({ roles }: { roles: RoleName[] }) => {
  if (roles.length === 0) {
    return <Typography.Text type="secondary">Rol yo'q</Typography.Text>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {roles.map((role) => (
        <RoleTag key={role} role={role} />
      ))}
    </div>
  )
}
