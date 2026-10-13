import { Avatar, type AvatarProps } from 'antd'
import { BRAND_COLORS } from '@/shared/config'
import type { User } from '../model/types'
import { getInitials } from '../lib/getFullName'

interface UserAvatarProps {
  user: Pick<User, 'firstName' | 'lastName'>
  size?: AvatarProps['size']
  shape?: AvatarProps['shape']
}

export const UserAvatar = ({ user, size = 'default', shape = 'circle' }: UserAvatarProps) => (
  <Avatar
    size={size}
    shape={shape}
    style={{ backgroundColor: BRAND_COLORS.primary, color: '#FFFFFF', flexShrink: 0 }}
  >
    {getInitials(user)}
  </Avatar>
)
