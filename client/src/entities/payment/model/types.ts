export type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED'

export interface Payment {
  id: number
  payer: string
  amount: number
  method: string
  status: PaymentStatus
  createdAt: string
}

export interface PaymentsParams {
  from?: string
  to?: string
}
