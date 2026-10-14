import { LogoutOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'
import { useConfirm } from '@/shared/lib/hooks'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const clearSession = useSessionStore((state) => state.clear)
  const confirm = useConfirm()

  return () =>
    confirm({
      danger: true,
      icon: <LogoutOutlined />,
      title: 'Tizimdan chiqish',
      description: 'Haqiqatan ham tizimdan chiqmoqchimisiz?',
      okText: 'Chiqish',
      onOk: () => {
        clearSession()
        queryClient.clear()
      },
    })
}
