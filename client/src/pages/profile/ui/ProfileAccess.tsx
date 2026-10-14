import { RightOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Card, Empty, Typography } from 'antd'
import { Link } from 'react-router'
import { hasAnyRole, type SessionUser } from '@/entities/session'
import { RequestAccessButton } from '@/features/access-request-create'
import { NAV_ITEMS, ROLES } from '@/shared/config'

export const ProfileAccess = ({ user }: { user: SessionUser }) => {
  const pages = NAV_ITEMS.filter((item) => hasAnyRole(user.roles, item.roles))
  const canRequestMore = !user.roles.includes(ROLES.ADMIN) && user.roles.length < 2

  return (
    <Card
      className="h-full border-(--ant-color-border)"
      title={
        <span>
          <SafetyCertificateOutlined className="me-2 text-(--ant-color-primary)" />
          Ruxsat etilgan bo'limlar
        </span>
      }
    >
      {pages.length === 0 ? (
        <Empty description="Hozircha ochiq bo'lim yo'q" />
      ) : (
        <div className="flex flex-col gap-2">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-(--ant-color-fill-alter)"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-(--ant-color-primary-bg) text-(--ant-color-primary)">
                {page.icon}
              </span>
              <Typography.Text className="flex-1">{page.label}</Typography.Text>
              <RightOutlined className="text-xs text-(--ant-color-text-tertiary)" />
            </Link>
          ))}
        </div>
      )}
      {canRequestMore && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-(--ant-color-border-secondary) pt-4">
          <Typography.Text type="secondary">Qo'shimcha bo'lim kerakmi?</Typography.Text>
          <RequestAccessButton />
        </div>
      )}
    </Card>
  )
}
