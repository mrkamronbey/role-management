import { useSessionStore } from '@/entities/session'
import { configureApi } from '@/shared/api'

export const setupApi = () => {
  configureApi({
    getToken: () => useSessionStore.getState().token,
    onUnauthorized: () => useSessionStore.getState().clear(true),
  })
}
