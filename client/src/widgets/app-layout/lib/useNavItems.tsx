import { Badge, type MenuProps } from 'antd'
import { usePendingRequestsQuery } from '@/entities/access-request'
import { hasAnyRole, useUserRoles } from '@/entities/session'
import { NAV_GROUPS, NAV_ITEMS, PAGE_ROLES, ROUTES } from '@/shared/config'

export const useNavItems = (collapsed: boolean): MenuProps['items'] => {
  const roles = useUserRoles()
  const canSeeRequests = hasAnyRole(roles, PAGE_ROLES.accessRequests)
  const pendingQuery = usePendingRequestsQuery(canSeeRequests)
  const pendingCount = pendingQuery.data?.total ?? 0

  return NAV_GROUPS.map((group) => ({
    key: group.key,
    type: 'group' as const,
    label: collapsed ? null : (
      <span className="font-semibold tracking-wider uppercase">{group.label}</span>
    ),
    children: NAV_ITEMS.filter(
      (item) => item.group === group.key && hasAnyRole(roles, item.roles),
    ).map((item) => ({
      key: item.path,
      icon: item.icon,
      label: item.label,
      extra:
        item.path === ROUTES.accessRequests && pendingCount > 0 ? (
          <Badge count={pendingCount} color="blue" />
        ) : null,
    })),
  })).filter((group) => group.children.length > 0)
}
