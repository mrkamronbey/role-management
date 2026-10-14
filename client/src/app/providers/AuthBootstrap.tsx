import { useEffect, type PropsWithChildren } from 'react'
import { DisconnectOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useMeQuery, useSessionStatus, useSessionStore } from '@/entities/session'
import { FullPageLoader, StatusPage } from '@/shared/ui'

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
      <StatusPage
        fullScreen
        icon={<DisconnectOutlined />}
        title="Serverga ulanib bo'lmadi"
        description="Internet aloqasini tekshiring yoki birozdan keyin qayta urinib ko'ring."
        actions={
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => meQuery.refetch()}>
            Qayta urinish
          </Button>
        }
      />
    )
  }

  return <FullPageLoader />
}
