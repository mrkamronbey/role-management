import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sessionApi, useSessionStore } from '@/entities/session'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const setSession = useSessionStore((state) => state.setSession)

  return useMutation({
    mutationFn: sessionApi.login,
    onSuccess: ({ accessToken, user }) => {
      queryClient.removeQueries()
      setSession(accessToken, user)
    },
  })
}
