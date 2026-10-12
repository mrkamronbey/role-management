import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accessRequestApi, accessRequestKeys } from '@/entities/access-request'
import { userKeys } from '@/entities/user'

interface ReviewVariables {
  id: number
  approve: boolean
}

export const useReviewAccessRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, approve }: ReviewVariables) =>
      approve ? accessRequestApi.approve(id) : accessRequestApi.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accessRequestKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
