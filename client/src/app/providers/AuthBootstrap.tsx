import { useEffect, type PropsWithChildren } from 'react'
import { Button } from 'antd'
import { useMeQuery, useSessionStatus, useSessionStore } from '@/entities/session'
import { FullPageLoader, ResultPage } from '@/shared/ui'

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
  const status = useSessionStatus()
  const setUser = useSessionStore((state) => state.setUser)
  const meQuery = useMeQuery(status === 'loading')

  useEffect(() => {
    if (meQuery.data) {
      setUser(meQuery.data)
    }
  }, [meQuery.data, setUser])

  if (status !== 'loading') {
    return children
  }

  if (meQuery.isError) {
    return (
      <ResultPage
        status="error"
        title="Serverga ulanib bo'lmadi"
        extra={<Button onClick={() => meQuery.refetch()}>Qayta urinish</Button>}
      />
    )
  }

  return <FullPageLoader />
}
