import { Tag, type TagProps } from 'antd'
import { ROLE_COLORS, ROLE_LABELS, type RoleName } from '@/shared/config'

interface RoleTagProps extends Omit<TagProps, 'color' | 'children'> {
  role: RoleName
}

export const RoleTag = ({ role, className, ...tagProps }: RoleTagProps) => (
  <Tag color={ROLE_COLORS[role]} className={`m-0 ${className ?? ''}`} {...tagProps}>
    {ROLE_LABELS[role] ?? role}
  </Tag>
)
