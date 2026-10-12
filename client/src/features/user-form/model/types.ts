import type { RoleName } from '@/shared/config'

export interface UserFormValues {
  firstName: string
  lastName: string
  email: string
  password?: string
  roles: RoleName[]
}
