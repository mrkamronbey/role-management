import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ReportsParams } from '../model/types'
import { reportApi } from './report.api'

export const useReportsQuery = (params: ReportsParams, enabled = true) =>
  useQuery({
    queryKey: ['reports', params],
    queryFn: () => reportApi.getList(params),
    placeholderData: keepPreviousData,
    enabled,
  })
