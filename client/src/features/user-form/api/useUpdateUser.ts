import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'
import { userApi, userKeys, type UpdateUserDto } from '@/entities/user'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const currentUser = useSessionStore((state) => state.user)
  const setUser = useSessionStore((state) => state.setUser)

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateUserDto }) => userApi.update(id, dto),
    onSuccess: (updatedUser) => {
      if (updatedUser.id === currentUser?.id) {
        setUser(updatedUser)
      }
      return queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
