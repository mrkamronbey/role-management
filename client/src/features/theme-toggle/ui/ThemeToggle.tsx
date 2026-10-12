import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useThemeStore } from '@/shared/lib/theme'

export const ThemeToggle = () => {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)
  const label = mode === 'dark' ? "Yorug' rejim" : 'Tungi rejim'

  return (
    <Tooltip title={label}>
      <Button
        type="text"
        icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleMode}
        aria-label={label}
      />
    </Tooltip>
  )
}
