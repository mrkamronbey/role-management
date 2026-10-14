import { useRef, type ReactNode } from 'react'
import { Empty, Table, type TableColumnsType } from 'antd'

interface DataTableProps<T> {
  columns: TableColumnsType<T>
  data: T[]
  loading?: boolean
  emptyText?: string
  minWidth?: number
  selectedId?: number | null
  startIndex?: number
  fixedColumns?: number
  summary?: (data: readonly T[]) => ReactNode
  onRowClick?: (record: T) => void
}

export const DataTable = <T extends { id: number }>({
  columns,
  data,
  loading = false,
  emptyText = "Ma'lumot yo'q",
  minWidth = 800,
  selectedId,
  startIndex,
  fixedColumns = 0,
  summary,
  onRowClick,
}: DataTableProps<T>) => {
  const numberColumn = {
    title: '№',
    key: 'rowNumber',
    width: 64,
    fixed: 'start' as const,
    render: (_: unknown, __: T, index: number) => (startIndex ?? 0) + index + 1,
  }

  const containerRef = useRef<HTMLDivElement>(null)

  const dataColumns = columns.map((column, index) =>
    index < fixedColumns ? { ...column, fixed: 'start' as const } : column,
  )

  return (
    <div
      ref={containerRef}
      className="max-h-full overflow-auto overscroll-none [&_.ant-table-sticky-scroll]:-mt-2 rounded-xl border border-(--ant-color-border) [&_.table-zebra:hover>td]:bg-(--ant-table-row-hover-bg) [&_.table-zebra>td]:bg-(--ant-color-fill-alter)"
    >
      <Table<T>
        rowKey="id"
        columns={startIndex === undefined ? dataColumns : [numberColumn, ...dataColumns]}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ x: minWidth }}
        sticky={{ getContainer: () => containerRef.current ?? window }}
        summary={summary}
        locale={{ emptyText: <Empty description={emptyText} /> }}
        rowClassName={(record, index) => {
          if (record.id === selectedId) {
            return 'ant-table-row-selected'
          }
          return index % 2 === 1 ? 'table-zebra' : ''
        }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
          className: onRowClick ? 'cursor-pointer' : '',
        })}
      />
    </div>
  )
}
