import { http } from '@/shared/api'
import type { Report } from '../model/types'

export const reportApi = {
  getList: () => http.get<Report[]>('/reports'),
}
