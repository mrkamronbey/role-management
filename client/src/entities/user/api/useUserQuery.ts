import { useQuery } from '@tanstack/react-query'
import { userApi } from './user.api'
import { userKeys } from './user.keys'

export const useUserQuery = (id: number) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getById(id),
  })
