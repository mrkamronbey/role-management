import { useQuery } from '@tanstack/react-query'
import { sessionApi } from './session.api'

export const useMeQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ['me'],
    queryFn: sessionApi.getMe,
    enabled,
  })
