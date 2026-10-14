import { ROLES } from '@/shared/config'
import { useUrlParams } from '@/shared/lib/hooks'

const ROLE_OPTIONS = Object.values(ROLES)

export const useUsersFilters = () => {
  const {
    page,
    limit,
    pageSizes,
    from,
    to,
    getParam,
    getOption,
    setParams,
    setPeriod,
    setPage,
    setLimit,
  } = useUrlParams()

  return {
    search: getParam('search') ?? '',
    role: getOption('role', ROLE_OPTIONS),
    from,
    to,
    page,
    limit,
    pageSizes,
    setSearch: (search: string) => setParams({ search }),
    setRole: (role?: string) => setParams({ role }),
    setPeriod,
    setPage,
    setLimit,
  }
}
