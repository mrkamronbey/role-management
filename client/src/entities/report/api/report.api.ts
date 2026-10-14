import { ENDPOINTS, http, type Paginated } from '@/shared/api'
import type { Report, ReportsParams } from '../model/types'

export const reportApi = {
  getList: (params: ReportsParams) =>
    http.get<Paginated<Report>>(ENDPOINTS.reports.list, { params }),
  download: (id: number) => http.download(ENDPOINTS.reports.download(id)),
}
