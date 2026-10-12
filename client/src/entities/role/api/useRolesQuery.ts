import { useQuery } from '@tanstack/react-query'
import { roleApi } from './role.api'

const roleKeys = {
  all: ['roles'] as const,
}

export const useRolesQuery = () =>
  useQuery({
    queryKey: roleKeys.all,
    queryFn: roleApi.getAll,
    staleTime: 5 * 60_000,
  })
