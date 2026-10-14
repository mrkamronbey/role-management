import type { AccessRequest } from '@/entities/access-request'
import type { Payment } from '@/entities/payment'

export interface ChartItem {
  name: string
  count: number
}

export interface Analytics {
  period: { from: string; to: string }
  users: { total: number; byRole: ChartItem[] }
  accessRequests: { pending: number; latest: AccessRequest[] }
  payments: {
    totalAmount: number
    latest: Payment[]
    byDay: { date: string; amount: number }[]
    byStatus: ChartItem[]
    byMethod: ChartItem[]
  }
  reports: { ready: number; byType: ChartItem[] }
}

export interface AnalyticsParams {
  from?: string
  to?: string
}
