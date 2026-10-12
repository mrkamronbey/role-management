import { useSessionStore } from './session.store'

type SessionStatus = 'guest' | 'loading' | 'authenticated'

export const useCurrentUser = () => useSessionStore((state) => state.user)

export const useUserRoles = () => {
  const user = useSessionStore((state) => state.user)
  return user?.roles ?? []
}

export const useSessionStatus = (): SessionStatus => {
  const token = useSessionStore((state) => state.token)
  const user = useSessionStore((state) => state.user)

  if (!token) return 'guest'
  if (!user) return 'loading'
  return 'authenticated'
}
