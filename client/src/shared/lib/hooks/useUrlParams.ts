import dayjs from 'dayjs'
import { useSearchParams } from 'react-router'

type ParamsUpdate = Record<string, string | undefined>

const PAGE_SIZES = [10, 20, 50]

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1

  const limitParam = Number(searchParams.get('limit'))
  const limit = PAGE_SIZES.includes(limitParam) ? limitParam : PAGE_SIZES[0]

  const getParam = (key: string) => searchParams.get(key) ?? undefined

  const getDate = (key: string) => {
    const value = searchParams.get(key)
    return value && dayjs(value).isValid() ? value : undefined
  }

  const getOption = <T extends string>(key: string, options: readonly T[]) => {
    const value = searchParams.get(key)
    return options.find((option) => option === value)
  }

  const setParams = (update: ParamsUpdate) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(update).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    if (!('page' in update)) {
      params.delete('page')
    }

    setSearchParams(params)
  }

  const setPeriod = (from?: string, to?: string) => setParams({ from, to })

  const setPage = (value: number) => setParams({ page: value > 1 ? String(value) : undefined })

  const setLimit = (value: number) =>
    setParams({ limit: value === PAGE_SIZES[0] ? undefined : String(value) })

  return {
    page,
    limit,
    pageSizes: PAGE_SIZES,
    from: getDate('from'),
    to: getDate('to'),
    getParam,
    getOption,
    setParams,
    setPeriod,
    setPage,
    setLimit,
  }
}
