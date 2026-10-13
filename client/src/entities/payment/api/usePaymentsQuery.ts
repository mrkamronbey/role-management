import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaymentsParams, PaymentsPeriod } from '../model/types'
import { paymentApi } from './payment.api'

const paymentKeys = {
  list: (params: PaymentsParams) => ['payments', 'list', params],
  summary: (period: PaymentsPeriod) => ['payments', 'summary', period],
}

export const usePaymentsQuery = (params: PaymentsParams, enabled = true) =>
  useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: () => paymentApi.getList(params),
    placeholderData: keepPreviousData,
    enabled,
  })

export const usePaymentsSummaryQuery = (period: PaymentsPeriod, enabled = true) =>
  useQuery({
    queryKey: paymentKeys.summary(period),
    queryFn: () => paymentApi.getSummary(period),
    placeholderData: keepPreviousData,
    enabled,
  })
