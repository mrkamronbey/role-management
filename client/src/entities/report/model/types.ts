import type { PaginationParams } from '@/shared/api'

export type ReportType = 'FINANCIAL' | 'OPERATIONAL' | 'RISK' | 'COMPLIANCE'

export type ReportStatus = 'READY' | 'PROCESSING'

export type ReportFormat = 'PDF' | 'XLSX'

export interface ReportMetric {
  label: string
  value: string
  change: string
}

export interface ReportTable {
  title: string
  columns: string[]
  rows: string[][]
}

export interface Report {
  id: number
  reportNumber: string
  title: string
  type: ReportType
  period: string
  periodMonth: string
  periodStart: string
  periodEnd: string
  version: string
  confidentiality: string
  status: ReportStatus
  description: string
  department: string
  author: string
  format: ReportFormat
  fileSizeKb: number | null
  approvedBy: string | null
  approvedAt: string | null
  metrics: ReportMetric[]
  highlights: string[]
  recommendations: string[]
  table: ReportTable | null
  createdAt: string
}

export interface ReportsParams extends PaginationParams {
  status?: ReportStatus
  type?: ReportType
  period?: string
  search?: string
}
