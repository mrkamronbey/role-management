import { Pagination } from 'antd'
import { useIsMobile } from '../../lib/hooks'

interface PaginationFooterProps {
  total: number
  page: number
  pageSize: number
  pageSizeOptions: number[]
  label: string
  onChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const PaginationFooter = ({
  total,
  page,
  pageSize,
  pageSizeOptions,
  label,
  onChange,
  onPageSizeChange,
}: PaginationFooterProps) => {
  const isMobile = useIsMobile()

  return (
    <Pagination
      simple={isMobile}
      current={page}
      pageSize={pageSize}
      total={total}
      showSizeChanger={!isMobile}
      pageSizeOptions={pageSizeOptions}
      showTotal={(count, [start, end]) =>
        isMobile
          ? `${start}–${end} / ${count} ta`
          : `Ko'rsatilmoqda ${start} – ${end} / ${count} ta ${label}`
      }
      onChange={(nextPage, nextPageSize) =>
        nextPageSize === pageSize ? onChange(nextPage) : onPageSizeChange(nextPageSize)
      }
      className="[&_.ant-pagination-total-text]:me-auto"
    />
  )
}
