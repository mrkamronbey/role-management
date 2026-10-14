import { useEffect } from 'react'
import { HistoryOutlined } from '@ant-design/icons'
import { Card, Empty, Flex, Skeleton, Timeline, Typography } from 'antd'
import {
  AccessRequestStatusTag,
  useMyAccessRequestsQuery,
  type AccessRequestStatus,
} from '@/entities/access-request'
import { RoleTag } from '@/entities/role'
import { useRefreshUser } from '@/entities/session'
import { formatDateTime } from '@/shared/lib/format'

const STATUS_COLORS: Record<AccessRequestStatus, string> = {
  PENDING: 'orange',
  APPROVED: 'green',
  REJECTED: 'red',
}

export const ProfileRequests = () => {
  const { data: requests, isPending, dataUpdatedAt } = useMyAccessRequestsQuery()
  const refreshUser = useRefreshUser()

  useEffect(() => {
    if (dataUpdatedAt) {
      refreshUser()
    }
  }, [dataUpdatedAt, refreshUser])

  let content
  if (isPending) {
    content = <Skeleton active />
  } else if (!requests?.length) {
    content = <Empty description="Hali so'rov yubormagansiz" />
  } else {
    content = (
      <Timeline
        items={requests.map((request) => ({
          key: request.id,
          color: STATUS_COLORS[request.status],
          content: (
            <Flex vertical gap={4}>
              <Flex align="center" gap={8} wrap>
                <RoleTag role={request.role} />
                <AccessRequestStatusTag status={request.status} />
              </Flex>
              <Typography.Text>{request.reason}</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                Yuborilgan: {formatDateTime(request.createdAt)}
                {request.reviewedAt && ` · Ko'rib chiqilgan: ${formatDateTime(request.reviewedAt)}`}
              </Typography.Text>
            </Flex>
          ),
        }))}
      />
    )
  }

  return (
    <Card
      title={
        <Flex align="center" gap={8}>
          <HistoryOutlined />
          Mening so'rovlarim
        </Flex>
      }
    >
      {content}
    </Card>
  )
}
