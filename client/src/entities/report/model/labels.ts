import type { ReportStatus, ReportType } from './types'

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  FINANCIAL: 'Moliyaviy',
  OPERATIONAL: 'Operatsion',
  RISK: 'Risklar',
  COMPLIANCE: 'Muvofiqlik',
}

export const REPORT_STATUS_META: Record<ReportStatus, { label: string; color: string }> = {
  READY: { label: 'Tayyor', color: 'success' },
  PROCESSING: { label: 'Tayyorlanmoqda', color: 'gold' },
}
