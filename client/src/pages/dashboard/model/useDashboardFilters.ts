import dayjs from 'dayjs'
import { useUrlParams } from '@/shared/lib/hooks'

const toDate = (value?: string) => (value && dayjs(value).isValid() ? value : undefined)

export const useDashboardFilters = () => {
  const { getParam, setParams } = useUrlParams()

  return {
    from: toDate(getParam('from')),
    to: toDate(getParam('to')),
    setPeriod: (from?: string, to?: string) => setParams({ from, to }),
  }
}
