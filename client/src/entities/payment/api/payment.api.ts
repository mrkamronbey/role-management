import { http } from '@/shared/api'
import type { Payment, PaymentsParams } from '../model/types'

export const paymentApi = {
  getList: (params: PaymentsParams) => http.get<Payment[]>('/payments', { params }),
}
