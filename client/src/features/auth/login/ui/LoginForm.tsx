import { LockOutlined, MailOutlined, StopOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import { useSessionStore, type LoginPayload } from '@/entities/session'
import { getErrorMessage, getErrorStatus } from '@/shared/api'
import { useAlert } from '@/shared/lib/hooks'
import { VALIDATION_MESSAGES } from '@/shared/lib/validation'
import { useLoginMutation } from '../api/useLoginMutation'

export const LoginForm = () => {
  const sessionExpired = useSessionStore((state) => state.sessionExpired)
  const login = useLoginMutation()
  const alert = useAlert()
  const isAccessDenied = getErrorStatus(login.error) === 403

  const handleFinish = (values: LoginPayload) => {
    login.mutate(
      { email: values.email.trim(), password: values.password },
      {
        onError: (error) => {
          if (getErrorStatus(error) !== 403) return
          alert({
            danger: true,
            icon: <StopOutlined />,
            title: 'Tizimga kirish mumkin emas',
            description: getErrorMessage(error),
            okText: 'Tushunarli',
          })
        },
      },
    )
  }

  return (
    <Form layout="vertical" requiredMark={false} onFinish={handleFinish}>
      {sessionExpired && !login.isError && (
        <Alert
          type="warning"
          showIcon
          className="mb-4"
          title="Sessiya muddati tugadi, qaytadan kiring"
        />
      )}
      {login.isError && !isAccessDenied && (
        <Alert type="error" showIcon className="mb-4" title={getErrorMessage(login.error)} />
      )}

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: VALIDATION_MESSAGES.required('Email') },
          { type: 'email', message: VALIDATION_MESSAGES.email },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="example@gmail.com"
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Parol"
        rules={[{ required: true, message: VALIDATION_MESSAGES.required('Parol') }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Parolingizni kiriting"
          autoComplete="current-password"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" size="large" block loading={login.isPending}>
        Kirish
      </Button>
    </Form>
  )
}
