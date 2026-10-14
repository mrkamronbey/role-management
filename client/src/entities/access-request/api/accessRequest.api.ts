import { ENDPOINTS, http, type Paginated } from '@/shared/api'
import type { AccessRequest, AccessRequestsParams, CreateAccessRequestDto } from '../model/types'

export const accessRequestApi = {
  getList: (params: AccessRequestsParams) =>
    http.get<Paginated<AccessRequest>>(ENDPOINTS.accessRequests.list, { params }),
  getMine: () => http.get<AccessRequest[]>(ENDPOINTS.accessRequests.my),
  create: (dto: CreateAccessRequestDto) =>
    http.post<AccessRequest>(ENDPOINTS.accessRequests.list, dto),
  approve: (id: number) => http.patch<AccessRequest>(ENDPOINTS.accessRequests.approve(id)),
  reject: (id: number) => http.patch<AccessRequest>(ENDPOINTS.accessRequests.reject(id)),
}
