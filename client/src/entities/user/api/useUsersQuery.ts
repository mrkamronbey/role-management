import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { UsersParams } from '../model/types'
import { userApi } from './user.api'
import { userKeys } from './user.keys'

export const useUsersQuery = (params: UsersParams, enabled = true) =>
  useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.getList(params),
    placeholderData: keepPreviousData,
    enabled,
  })
