import { useQueryClient } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const clearSession = useSessionStore((state) => state.clear)

  return () => {
    clearSession()
    queryClient.clear()
  }
}
