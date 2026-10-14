import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { RoleName } from '@/shared/config'

const TOKEN_COOKIE = 'token'
const TOKEN_EXPIRES_DAYS = 1

export interface SessionUser {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: RoleName[]
  createdAt: string
}

interface SessionState {
  token: string | null
  user: SessionUser | null
  sessionExpired: boolean
  setSession: (token: string, user: SessionUser) => void
  setUser: (user: SessionUser) => void
  clear: (expired?: boolean) => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: Cookies.get(TOKEN_COOKIE) ?? null,
  user: null,
  sessionExpired: false,
  setSession: (token, user) => {
    Cookies.set(TOKEN_COOKIE, token, { expires: TOKEN_EXPIRES_DAYS, sameSite: 'strict' })
    set({ token, user, sessionExpired: false })
  },
  setUser: (user) => set({ user }),
  clear: (expired = false) => {
    Cookies.remove(TOKEN_COOKIE)
    set({ token: null, user: null, sessionExpired: expired })
  },
}))
