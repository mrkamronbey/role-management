import { useSearchParams } from 'react-router'
import type { RoleName } from '@/shared/config'

export const USERS_PAGE_SIZE = 10

export const useUsersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const role = (searchParams.get('role') as RoleName | null) ?? undefined
  const page = Number(searchParams.get('page')) || 1

  const setParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    if (key !== 'page') {
      params.delete('page')
    }

    setSearchParams(params)
  }

  return {
    search,
    role,
    page,
    setSearch: (value: string) => setParam('search', value),
    setRole: (value?: RoleName) => setParam('role', value),
    setPage: (value: number) => setParam('page', String(value)),
  }
}
