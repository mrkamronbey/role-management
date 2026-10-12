import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi, userKeys } from '@/entities/user'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  })
}
