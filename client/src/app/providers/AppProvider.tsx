import type { PropsWithChildren } from 'react'
import { AuthBootstrap } from './AuthBootstrap'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'

export const AppProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <QueryProvider>
      <AuthBootstrap>{children}</AuthBootstrap>
    </QueryProvider>
  </ThemeProvider>
)
