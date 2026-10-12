export type ReportType = 'FINANCIAL' | 'OPERATIONAL' | 'RISK' | 'COMPLIANCE'

export type ReportStatus = 'READY' | 'PROCESSING'

export interface Report {
  id: number
  title: string
  type: ReportType
  period: string
  status: ReportStatus
  createdAt: string
}
