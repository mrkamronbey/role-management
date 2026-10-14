import type { ReactNode } from 'react'
import {
  AlertOutlined,
  FundOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { ReportType } from '../model/types'

const TYPE_ICONS: Record<ReportType, ReactNode> = {
  FINANCIAL: <FundOutlined />,
  OPERATIONAL: <SettingOutlined />,
  RISK: <AlertOutlined />,
  COMPLIANCE: <SafetyCertificateOutlined />,
}

interface ReportTypeIconProps {
  type: ReportType
  size?: 'small' | 'large'
}

export const ReportTypeIcon = ({ type, size = 'large' }: ReportTypeIconProps) => (
  <span
    className={`flex shrink-0 items-center justify-center bg-(--ant-color-primary-bg) text-(--ant-color-primary) ${
      size === 'large' ? 'size-14 rounded-xl text-2xl' : 'size-9 rounded-lg text-base'
    }`}
  >
    {TYPE_ICONS[type]}
  </span>
)
