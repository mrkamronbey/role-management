import { Spin } from 'antd'

export const FullPageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-(--ant-color-bg-layout)">
    <Spin size="large" />
  </div>
)
