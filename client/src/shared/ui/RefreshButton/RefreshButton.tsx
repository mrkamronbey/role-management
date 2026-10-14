import { ReloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

interface RefreshButtonProps {
  loading: boolean
  onClick: () => void
}

export const RefreshButton = ({ loading, onClick }: RefreshButtonProps) => (
  <Tooltip title="Yangilash">
    <Button aria-label="Yangilash" icon={<ReloadOutlined spin={loading} />} onClick={onClick} />
  </Tooltip>
)
