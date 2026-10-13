import { ENDPOINTS, http } from '@/shared/api'
import type { Role } from '../model/types'

export const roleApi = {
  getAll: () => http.get<Role[]>(ENDPOINTS.roles),
}
