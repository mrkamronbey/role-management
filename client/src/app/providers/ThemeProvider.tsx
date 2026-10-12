import type { PropsWithChildren } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { App as AntApp, ConfigProvider } from 'antd'
import uzUZ from 'antd/locale/uz_UZ'
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn'
import { useThemeStore } from '@/shared/lib/theme'
import { getThemeConfig } from '../styles/theme'

dayjs.locale('uz-latn')

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useThemeStore((state) => state.mode)

  return (
    <StyleProvider layer>
      <ConfigProvider
        locale={uzUZ}
        theme={getThemeConfig(mode)}
        button={{ className: 'shadow-none' }}
        card={{ classNames: { body: 'p-4 md:p-6' } }}
      >
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </StyleProvider>
  )
}
