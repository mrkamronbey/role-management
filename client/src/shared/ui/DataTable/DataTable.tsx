import { Card, Empty, Table, type TableColumnsType } from 'antd'

interface DataTableProps<T> {
  columns: TableColumnsType<T>
  data: T[]
  loading?: boolean
  emptyText?: string
  scrollX?: number
  selectedId?: number | null
  onRowClick?: (record: T) => void
}

export const DataTable = <T extends { id: number }>({
  columns,
  data,
  loading = false,
  emptyText = "Ma'lumot yo'q",
  scrollX = 800,
  selectedId,
  onRowClick,
}: DataTableProps<T>) => (
  <Card styles={{ body: { padding: '0 0 16px' } }}>
    <Table<T>
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: scrollX }}
      locale={{ emptyText: <Empty description={emptyText} /> }}
      rowClassName={(record) => (record.id === selectedId ? 'ant-table-row-selected' : '')}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
        className: onRowClick ? 'cursor-pointer' : '',
      })}
    />
  </Card>
)
