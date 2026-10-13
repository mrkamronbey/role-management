import { Pagination, Typography } from 'antd'

interface PaginationFooterProps {
  total: number
  page: number
  pageSize: number
  label: string
  onChange: (page: number) => void
}

export const PaginationFooter = ({
  total,
  page,
  pageSize,
  label,
  onChange,
}: PaginationFooterProps) => (
  <div className="flex items-center justify-between gap-3">
    <Typography.Text type="secondary" className="hidden sm:inline">
      Jami: {total} ta {label}
    </Typography.Text>
    <Pagination
      size="small"
      current={page}
      pageSize={pageSize}
      total={total}
      showSizeChanger={false}
      onChange={onChange}
    />
  </div>
)
