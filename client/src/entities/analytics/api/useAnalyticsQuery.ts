import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { AnalyticsParams } from '../model/types'
import { analyticsApi } from './analytics.api'

export const useAnalyticsQuery = (params: AnalyticsParams) =>
  useQuery({
    queryKey: ['analytics', params],
    queryFn: () => analyticsApi.get(params),
    placeholderData: keepPreviousData,
    staleTime: 0,
  })
