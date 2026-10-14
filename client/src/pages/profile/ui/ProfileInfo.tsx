import { IdcardOutlined } from '@ant-design/icons'
import { Card, Descriptions, Typography } from 'antd'
import type { SessionUser } from '@/entities/session'
import { formatDateTime } from '@/shared/lib/format'

export const ProfileInfo = ({ user }: { user: SessionUser }) => (
  <Card
    className="h-full border-(--ant-color-border)"
    title={
      <span>
        <IdcardOutlined className="me-2 text-(--ant-color-primary)" />
        Shaxsiy ma'lumotlar
      </span>
    }
  >
    <Descriptions
      column={1}
      size="small"
      items={[
        { label: 'Ism', children: user.firstName },
        { label: 'Familiya', children: user.lastName },
        {
          label: 'Email',
          children: <Typography.Text copyable>{user.email}</Typography.Text>,
        },
        { label: 'Foydalanuvchi ID', children: `#${user.id}` },
        { label: "Ro'yxatdan o'tgan", children: formatDateTime(user.createdAt) },
      ]}
    />
  </Card>
)
