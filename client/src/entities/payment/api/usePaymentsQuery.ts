import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaymentsParams } from '../model/types'
import { paymentApi } from './payment.api'

const paymentKeys = {
  all: ['payments'] as const,
  list: (params: PaymentsParams) => [...paymentKeys.all, params] as const,
}

export const usePaymentsQuery = (params: PaymentsParams, enabled = true) =>
  useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: () => paymentApi.getList(params),
    placeholderData: keepPreviousData,
    enabled,
  })
