import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Segmented } from 'antd'
import { useIsMobile } from '../../lib/hooks'
import type { ViewMode } from './viewModes'

interface ViewSwitcherProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

export const ViewSwitcher = ({ value, onChange }: ViewSwitcherProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return null
  }

  return (
    <Segmented<ViewMode>
      value={value}
      onChange={onChange}
      options={[
        { value: 'grid', icon: <AppstoreOutlined />, title: 'Kartalar' },
        { value: 'list', icon: <UnorderedListOutlined />, title: "Ro'yxat" },
      ]}
    />
  )
}
