import type { PaginationParams } from '@/shared/api'

export type ReportType = 'FINANCIAL' | 'OPERATIONAL' | 'RISK' | 'COMPLIANCE'

export type ReportStatus = 'READY' | 'PROCESSING'

export type ReportFormat = 'PDF' | 'XLSX'

export interface ReportMetric {
  label: string
  value: string
}

export interface Report {
  id: number
  reportNumber: string
  title: string
  type: ReportType
  period: string
  status: ReportStatus
  description: string
  department: string
  author: string
  format: ReportFormat
  fileSizeKb: number | null
  metrics: ReportMetric[]
  createdAt: string
}

export interface ReportsParams extends PaginationParams {
  status?: ReportStatus
  search?: string
}
