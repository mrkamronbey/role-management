import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accessRequestApi, accessRequestKeys } from '@/entities/access-request'

export const useCreateAccessRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accessRequestApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accessRequestKeys.all }),
  })
}
