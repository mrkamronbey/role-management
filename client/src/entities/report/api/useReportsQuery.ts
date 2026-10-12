import { useQuery } from '@tanstack/react-query'
import { reportApi } from './report.api'

const reportKeys = {
  all: ['reports'] as const,
}

export const useReportsQuery = (enabled = true) =>
  useQuery({
    queryKey: reportKeys.all,
    queryFn: reportApi.getList,
    enabled,
  })
