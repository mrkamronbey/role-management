import { ENDPOINTS, http, type Paginated } from '@/shared/api'
import type {
  Payment,
  PaymentsExportParams,
  PaymentsParams,
  PaymentsPeriod,
  PaymentsSummary,
} from '../model/types'

export const paymentApi = {
  getList: (params: PaymentsParams) =>
    http.get<Paginated<Payment>>(ENDPOINTS.payments.list, { params }),
  getSummary: (period: PaymentsPeriod) =>
    http.get<PaymentsSummary>(ENDPOINTS.payments.summary, { params: period }),
  exportFile: (params: PaymentsExportParams) => http.download(ENDPOINTS.payments.export, params),
  downloadReceipt: (id: number) => http.download(ENDPOINTS.payments.receipt(id)),
}
