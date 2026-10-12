import type { ReactNode } from 'react'
import type { RoleName } from '@/shared/config'
import { useHasRole } from '../model/useHasRole'

interface PrivateComponentProps {
  roles: RoleName[]
  fallback?: ReactNode
  children: ReactNode
}

export const PrivateComponent = ({ roles, fallback = null, children }: PrivateComponentProps) => {
  const hasRole = useHasRole(roles)
  return hasRole ? children : fallback
}
