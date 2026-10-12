import { http, type Paginated } from '@/shared/api'
import type { CreateUserDto, UpdateUserDto, User, UsersParams } from '../model/types'

export const userApi = {
  getList: (params: UsersParams) => http.get<Paginated<User>>('/users', { params }),
  getById: (id: number) => http.get<User>(`/users/${id}`),
  create: (dto: CreateUserDto) => http.post<User>('/users', dto),
  update: (id: number, dto: UpdateUserDto) => http.patch<User>(`/users/${id}`, dto),
  remove: (id: number) => http.delete<null>(`/users/${id}`),
}
