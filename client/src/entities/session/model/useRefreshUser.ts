import { useCallback } from 'react'
import { sessionApi } from '../api/session.api'
import { useSessionStore } from './session.store'

export const useRefreshUser = () => {
  const setUser = useSessionStore((state) => state.setUser)

  return useCallback(async () => {
    setUser(await sessionApi.getMe())
  }, [setUser])
}
