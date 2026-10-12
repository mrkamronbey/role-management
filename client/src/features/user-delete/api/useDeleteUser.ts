import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi, userKeys } from '@/entities/user'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  })
}
