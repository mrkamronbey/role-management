import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import { useSessionStore, type LoginPayload } from '@/entities/session'
import { getErrorMessage } from '@/shared/api'
import { VALIDATION_MESSAGES } from '@/shared/lib/validation'
import { useLoginMutation } from '../api/useLoginMutation'

export const LoginForm = () => {
  const sessionExpired = useSessionStore((state) => state.sessionExpired)
  const login = useLoginMutation()

  const handleFinish = (values: LoginPayload) => {
    login.mutate({ email: values.email.trim(), password: values.password })
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
      {login.isError && (
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
        <Input prefix={<MailOutlined />} placeholder="example@gmail.com" autoComplete="email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Parol"
        rules={[{ required: true, message: VALIDATION_MESSAGES.required('Parol') }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Parolingizni kiriting"
          autoComplete="current-password"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={login.isPending}>
        Kirish
      </Button>
    </Form>
  )
}
