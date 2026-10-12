import type { RoleName } from '@/shared/config'

export interface Role {
  id: number
  name: RoleName
  description: string | null
}
