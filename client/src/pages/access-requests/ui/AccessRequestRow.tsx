import { ClockCircleOutlined, KeyOutlined, MessageOutlined } from '@ant-design/icons'
import { Card, Flex, Tooltip, Typography } from 'antd'
import { AccessRequestStatusTag, type AccessRequest } from '@/entities/access-request'
import { UserAvatar, getFullName } from '@/entities/user'
import { ReviewButtons } from '@/features/access-request-review'
import { ROLE_LABELS } from '@/shared/config'
import { formatDateTime, formatDuration, formatRelative } from '@/shared/lib/format'
import { getRequestSection } from '../lib/getRequestSection'
import { useStatusColors } from '../lib/useStatusColors'

export const AccessRequestRow = ({ request }: { request: AccessRequest }) => {
  const statusColors = useStatusColors()
  const section = getRequestSection(request.role)

  return (
    <Card
      className="border-(--ant-color-border)"
      style={{ borderLeft: `4px solid ${statusColors[request.status]}` }}
      styles={{ body: { padding: '16px 20px' } }}
    >
      <Flex wrap align="center" gap={16} className="xl:flex-nowrap">
        <Flex align="center" gap={12} className="w-full min-w-0 md:w-56 md:shrink-0">
          <UserAvatar user={request.user} size={40} />
          <Flex vertical className="min-w-0">
            <Typography.Text strong className="truncate">
              {getFullName(request.user)}
            </Typography.Text>
            <Typography.Text type="secondary" className="truncate text-xs">
              {request.user.email}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex align="center" gap={10} className="md:w-48 md:shrink-0">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-(--ant-color-primary-bg) text-base text-(--ant-color-primary)">
            {section?.icon ?? <KeyOutlined />}
          </span>
          <Flex vertical>
            <Typography.Text type="secondary" className="text-xs">
              So'ralayotgan ruxsat
            </Typography.Text>
            <Typography.Text strong>{section?.label ?? ROLE_LABELS[request.role]}</Typography.Text>
          </Flex>
        </Flex>

        <Flex
          align="center"
          gap={8}
          className="w-full min-w-0 rounded-lg bg-(--ant-color-fill-alter) px-3 py-2 xl:w-auto xl:flex-1"
        >
          <MessageOutlined className="text-(--ant-color-text-secondary)" />
          <Typography.Text italic ellipsis={{ tooltip: request.reason }}>
            {request.reason}
          </Typography.Text>
        </Flex>

        <Flex vertical align="end" className="shrink-0 xl:w-32">
          <Typography.Text type="secondary" className="text-xs">
            #{request.id}
          </Typography.Text>
          <Tooltip title={formatDateTime(request.createdAt)}>
            <Typography.Text type="secondary" className="text-xs">
              {formatRelative(request.createdAt)}
            </Typography.Text>
          </Tooltip>
        </Flex>

        <Flex justify="end" className="ms-auto shrink-0 xl:ms-0 xl:w-64">
          {request.status === 'PENDING' ? (
            <ReviewButtons requestId={request.id} />
          ) : (
            <Flex vertical align="end" gap={4}>
              <AccessRequestStatusTag status={request.status} />
              {request.reviewedAt && (
                <Typography.Text type="secondary" className="text-xs">
                  <ClockCircleOutlined /> {formatDuration(request.createdAt, request.reviewedAt)}{' '}
                  ichida ko'rib chiqildi
                </Typography.Text>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
