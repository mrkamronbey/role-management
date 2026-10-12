import { Result, type ResultProps } from 'antd'

interface ResultPageProps extends ResultProps {
  fullScreen?: boolean
}

export const ResultPage = ({ fullScreen, ...props }: ResultPageProps) => {
  if (!fullScreen) {
    return <Result {...props} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--ant-color-bg-layout)">
      <Result {...props} />
    </div>
  )
}
