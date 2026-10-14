import { flushSync } from 'react-dom'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useThemeStore } from '@/shared/lib/theme'

const canAnimate = () =>
  'startViewTransition' in document &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const ThemeToggle = () => {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)
  const label = mode === 'dark' ? "Yorug' rejim" : 'Tungi rejim'

  const switchTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    flushSync(toggleMode)
    void root.offsetHeight
    root.classList.remove('theme-switching')
  }

  const handleToggle = () => {
    if (canAnimate()) {
      document.startViewTransition(switchTheme)
    } else {
      switchTheme()
    }
  }

  return (
    <Tooltip title={label}>
      <Button
        type="text"
        icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={handleToggle}
        aria-label={label}
      />
    </Tooltip>
  )
}
