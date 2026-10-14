import { App } from 'antd'
import { getErrorMessage } from '@/shared/api'

export const useNotify = () => {
  const { message } = App.useApp()

  return {
    success: (text: string) => message.success(text),
    error: (error: unknown) => message.error(getErrorMessage(error)),
  }
}
