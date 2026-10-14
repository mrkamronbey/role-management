import { ENDPOINTS, http } from '@/shared/api'
import type { Analytics, AnalyticsParams } from '../model/types'

export const analyticsApi = {
  get: (params: AnalyticsParams) => http.get<Analytics>(ENDPOINTS.analytics, { params }),
}
