import type { RoleName } from '@/shared/config'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: RoleName[]
  createdAt: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
  roles: RoleName[]
}

export type UpdateUserDto = Partial<CreateUserDto>

export interface UsersParams {
  search?: string
  role?: RoleName
  from?: string
  to?: string
  page: number
  limit: number
}
