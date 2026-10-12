import { Empty } from 'antd'

export const EmptyState = ({ description }: { description: string }) => (
  <div className="flex h-full min-h-80 items-center justify-center rounded-2xl border border-(--ant-color-border-secondary) bg-(--ant-color-bg-container)">
    <Empty description={description} />
  </div>
)
