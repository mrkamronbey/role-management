import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RoleName } from '@/shared/config'

export interface SessionUser {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: RoleName[]
}

interface SessionState {
  token: string | null
  user: SessionUser | null
  sessionExpired: boolean
  setSession: (token: string, user: SessionUser) => void
  setUser: (user: SessionUser) => void
  clear: (expired?: boolean) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      sessionExpired: false,
      setSession: (token, user) => set({ token, user, sessionExpired: false }),
      setUser: (user) => set({ user }),
      clear: (expired = false) => set({ token: null, user: null, sessionExpired: expired }),
    }),
    {
      name: 'session',
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
