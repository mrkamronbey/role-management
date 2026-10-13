import { SafetyCertificateFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { BRAND_COLORS } from '@/shared/config'

export const AppLogo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <div className={`flex h-full items-center gap-3 ${collapsed ? 'justify-center' : 'px-6'}`}>
    <SafetyCertificateFilled className="text-2xl" style={{ color: BRAND_COLORS.primary }} />
    {!collapsed && (
      <Typography.Text strong className="text-base">
        Boshqaruv tizimi
      </Typography.Text>
    )}
  </div>
)
