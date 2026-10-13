import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { AccessRequestsParams } from '../model/types'
import { accessRequestApi } from './accessRequest.api'

export const accessRequestKeys = {
  all: ['access-requests'],
  list: (params: AccessRequestsParams) => ['access-requests', params],
}

export const useAccessRequestsQuery = (params: AccessRequestsParams, enabled = true) =>
  useQuery({
    queryKey: accessRequestKeys.list(params),
    queryFn: () => accessRequestApi.getList(params),
    placeholderData: keepPreviousData,
    enabled,
  })

export const usePendingRequestsQuery = (enabled = true) =>
  useAccessRequestsQuery({ status: 'pending', page: 1, limit: 5 }, enabled)
