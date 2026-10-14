import {
  ClockCircleOutlined,
  HistoryOutlined,
  KeyOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Card, Flex, Tooltip, Typography } from 'antd'
import { AccessRequestStatusTag, type AccessRequest } from '@/entities/access-request'
import { RoleTag } from '@/entities/role'
import { UserAvatar, getFullName } from '@/entities/user'
import { ReviewButtons } from '@/features/access-request-review'
import { ROLE_LABELS } from '@/shared/config'
import { formatDateTime, formatDuration, formatRelative } from '@/shared/lib/format'
import { getRequestSection } from '../lib/getRequestSection'
import { useStatusColors } from '../lib/useStatusColors'

export const AccessRequestCard = ({ request }: { request: AccessRequest }) => {
  const statusColors = useStatusColors()
  const section = getRequestSection(request.role)

  return (
    <Card
      className="h-full border-(--ant-color-border)"
      style={{ borderLeft: `4px solid ${statusColors[request.status]}` }}
      styles={{ body: { display: 'flex', flexDirection: 'column', gap: 16, height: '100%' } }}
    >
      <Flex align="center" gap={12}>
        <UserAvatar user={request.user} size={44} />
        <Flex vertical className="min-w-0 flex-1">
          <Typography.Text strong className="text-base">
            {getFullName(request.user)}
          </Typography.Text>
          <Typography.Text type="secondary" className="truncate text-xs">
            {request.user.email}
          </Typography.Text>
        </Flex>
        <Flex vertical align="end">
          <Typography.Text type="secondary" className="text-xs">
            #{request.id}
          </Typography.Text>
          <Tooltip title={formatDateTime(request.createdAt)}>
            <Typography.Text type="secondary" className="text-xs">
              {formatRelative(request.createdAt)}
            </Typography.Text>
          </Tooltip>
        </Flex>
      </Flex>

      <Flex align="center" gap={12} className="rounded-xl bg-(--ant-color-primary-bg) px-4 py-3">
        <span className="text-xl text-(--ant-color-primary)">
          {section?.icon ?? <KeyOutlined />}
        </span>
        <Flex vertical className="min-w-0 flex-1">
          <Typography.Text type="secondary" className="text-xs">
            So'ralayotgan ruxsat
          </Typography.Text>
          <Typography.Text strong>
            {section ? `${section.label} bo'limiga kirish` : ROLE_LABELS[request.role]}
          </Typography.Text>
        </Flex>
        <RoleTag role={request.role} />
      </Flex>

      <Flex gap={10} className="rounded-xl bg-(--ant-color-fill-alter) px-4 py-3">
        <MessageOutlined className="mt-1 text-(--ant-color-text-secondary)" />
        <Typography.Text className="italic">{request.reason}</Typography.Text>
      </Flex>

      <Flex
        wrap
        align="center"
        justify="space-between"
        gap={8}
        className="mt-auto border-t border-(--ant-color-border-secondary) pt-4"
      >
        {request.status === 'PENDING' ? (
          <>
            <Typography.Text type="secondary" className="text-xs">
              <ClockCircleOutlined /> Kutmoqda: {formatDuration(request.createdAt, new Date())}
            </Typography.Text>
            <ReviewButtons requestId={request.id} />
          </>
        ) : (
          <>
            <Typography.Text type="secondary" className="text-xs">
              <HistoryOutlined />{' '}
              {request.reviewedAt
                ? `${formatDuration(request.createdAt, request.reviewedAt)} ichida ko'rib chiqildi`
                : "Ko'rib chiqilgan"}
            </Typography.Text>
            <AccessRequestStatusTag status={request.status} />
          </>
        )}
      </Flex>
    </Card>
  )
}
