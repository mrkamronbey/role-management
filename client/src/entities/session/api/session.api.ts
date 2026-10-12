import { http } from '@/shared/api'
import type { SessionUser } from '../model/session.store'

export interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  user: SessionUser
}

export const sessionApi = {
  login: (payload: LoginPayload) => http.post<LoginResponse>('/auth/login', payload),
  getMe: () => http.get<SessionUser>('/auth/me'),
}
