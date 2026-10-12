import { Card, Typography } from 'antd'
import { AccessRequestStatusTag, type AccessRequest } from '@/entities/access-request'
import { RoleTag } from '@/entities/role'
import { UserAvatar, getFullName } from '@/entities/user'
import { ReviewButtons } from '@/features/access-request-review'
import { formatRelative } from '@/shared/lib/format'

export const AccessRequestCard = ({ request }: { request: AccessRequest }) => (
  <Card>
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 gap-4">
        <UserAvatar user={request.user} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Typography.Text strong className="text-base">
              {getFullName(request.user)}
            </Typography.Text>
            <RoleTag role={request.role} />
            <Typography.Text type="secondary" className="text-sm">
              {formatRelative(request.createdAt)}
            </Typography.Text>
          </div>
          <div className="mt-2 inline-block rounded-lg bg-(--ant-color-fill-quaternary) px-3 py-2">
            “{request.reason}”
          </div>
        </div>
      </div>

      {request.status === 'PENDING' ? (
        <ReviewButtons requestId={request.id} />
      ) : (
        <div className="flex flex-col items-start gap-1 md:items-end">
          <AccessRequestStatusTag status={request.status} />
          {request.reviewedAt && (
            <Typography.Text type="secondary" className="text-xs">
              {formatRelative(request.reviewedAt)}
            </Typography.Text>
          )}
        </div>
      )}
    </div>
  </Card>
)
