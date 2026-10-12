import { BellOutlined } from '@ant-design/icons'
import { Button, Empty, Popover } from 'antd'

export const NotificationBell = () => (
  <Popover
    trigger="click"
    placement="bottomRight"
    title="Bildirishnomalar"
    content={
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Yangi bildirishnomalar yo'q"
        className="w-64"
      />
    }
  >
    <Button type="text" icon={<BellOutlined />} />
  </Popover>
)
