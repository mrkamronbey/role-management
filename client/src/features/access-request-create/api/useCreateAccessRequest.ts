import { useMutation } from '@tanstack/react-query'
import { accessRequestApi } from '@/entities/access-request'

export const useCreateAccessRequest = () =>
  useMutation({
    mutationFn: accessRequestApi.create,
  })
