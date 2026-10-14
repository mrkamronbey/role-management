import type { PaymentStatus } from '@/entities/payment'
import { useUrlParams } from '@/shared/lib/hooks'

const STATUS_OPTIONS: PaymentStatus[] = ['SUCCESS', 'PENDING', 'FAILED']

export const usePaymentsFilters = () => {
  const { page, limit, pageSizes, from, to, getOption, setParams, setPeriod, setPage, setLimit } =
    useUrlParams()

  return {
    from,
    to,
    status: getOption('status', STATUS_OPTIONS),
    page,
    limit,
    pageSizes,
    setPeriod,
    setStatus: (status?: PaymentStatus) => setParams({ status }),
    setPage,
    setLimit,
  }
}
