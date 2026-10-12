import { useQuery } from '@tanstack/react-query'
import { accessRequestApi } from './accessRequest.api'

export const accessRequestKeys = {
  all: ['access-requests'],
}

export const useAccessRequestsQuery = (enabled = true) =>
  useQuery({
    queryKey: accessRequestKeys.all,
    queryFn: accessRequestApi.getList,
    enabled,
  })
