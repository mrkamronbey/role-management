import { http } from '@/shared/api'
import type { AccessRequest, CreateAccessRequestDto } from '../model/types'

export const accessRequestApi = {
  getList: () => http.get<AccessRequest[]>('/access-requests'),
  create: (dto: CreateAccessRequestDto) => http.post<AccessRequest>('/access-requests', dto),
  approve: (id: number) => http.patch<AccessRequest>(`/access-requests/${id}/approve`),
  reject: (id: number) => http.patch<AccessRequest>(`/access-requests/${id}/reject`),
}
