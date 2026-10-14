import { Typography } from 'antd'
import mbLogo from '@/shared/assets/mb-logo.svg'

export const AppLogo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <div className={`flex h-full items-center gap-3 ${collapsed ? 'justify-center' : 'px-6'}`}>
    <img src={mbLogo} alt="Markaziy bank" className="h-9 w-9 shrink-0" />
    {!collapsed && (
      <Typography.Text strong className="text-base">
        Boshqaruv tizimi
      </Typography.Text>
    )}
  </div>
)
