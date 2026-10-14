import type { PaginationParams } from '@/shared/api'

export type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED'

export interface Payment {
  id: number
  receiptNumber: string
  transactionId: string
  payer: string
  payerAccount: string
  recipient: string
  recipientAccount: string
  purpose: string
  amount: number
  commission: number
  currency: string
  method: string
  status: PaymentStatus
  createdAt: string
}

export interface PaymentsPeriod {
  from?: string
  to?: string
}

export interface PaymentsParams extends PaymentsPeriod, PaginationParams {
  status?: PaymentStatus
  search?: string
}

export type PaymentsExportFormat = 'csv' | 'xlsx'

export interface PaymentsExportParams extends PaymentsPeriod {
  status?: PaymentStatus
  format: PaymentsExportFormat
}

export interface PaymentsSummary {
  totalAmount: number
  success: number
  pending: number
  failed: number
}
