import { Button, Result } from 'antd'
import { getErrorMessage } from '../../api'

interface ErrorResultProps {
  title: string
  error: unknown
  onRetry: () => void
}

export const ErrorResult = ({ title, error, onRetry }: ErrorResultProps) => (
  <Result
    status="error"
    title={title}
    subTitle={getErrorMessage(error)}
    extra={<Button onClick={onRetry}>Qayta urinish</Button>}
  />
)
