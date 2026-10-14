import { ROLES } from '@/shared/config'
import { useIsMobile, useUrlParams } from '@/shared/lib/hooks'
import { VIEW_MODES, type ViewMode } from '@/shared/ui'

export type Tab = 'pending' | 'reviewed'

const TABS: Tab[] = ['pending', 'reviewed']
const ROLE_OPTIONS = [ROLES.PAYMENT, ROLES.REPORTS]

export const useAccessRequestsFilters = () => {
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
  const isMobile = useIsMobile()

  return {
    tab: getOption('tab', TABS) ?? 'pending',
    search: getParam('search') ?? '',
    role: getOption('role', ROLE_OPTIONS),
    from,
    to,
    view: isMobile ? 'grid' : (getOption('view', VIEW_MODES) ?? 'list'),
    page,
    limit,
    pageSizes,
    setTab: (tab: Tab) => setParams({ tab: tab === 'pending' ? undefined : tab }),
    setSearch: (search: string) => setParams({ search }),
    setRole: (role?: string) => setParams({ role }),
    setPeriod,
    setView: (view: ViewMode) => setParams({ view, page: page > 1 ? String(page) : undefined }),
    setPage,
    setLimit,
  }
}
