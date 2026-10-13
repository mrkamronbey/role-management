import { ENDPOINTS, http, type Paginated } from '@/shared/api'
import type { CreateUserDto, UpdateUserDto, User, UsersParams } from '../model/types'

export const userApi = {
  getList: (params: UsersParams) => http.get<Paginated<User>>(ENDPOINTS.users.list, { params }),
  getById: (id: number) => http.get<User>(ENDPOINTS.users.byId(id)),
  create: (dto: CreateUserDto) => http.post<User>(ENDPOINTS.users.list, dto),
  update: (id: number, dto: UpdateUserDto) => http.patch<User>(ENDPOINTS.users.byId(id), dto),
  remove: (id: number) => http.delete<null>(ENDPOINTS.users.byId(id)),
}
