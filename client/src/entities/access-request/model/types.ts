import type { PaginationParams } from '@/shared/api'
import type { RoleName } from '@/shared/config'

export type AccessRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface AccessRequest {
  id: number
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  role: RoleName
  reason: string
  status: AccessRequestStatus
  createdAt: string
  reviewedAt: string | null
}

export interface CreateAccessRequestDto {
  role: RoleName
  reason: string
}

export interface AccessRequestsParams extends PaginationParams {
  status?: 'pending' | 'reviewed'
}
