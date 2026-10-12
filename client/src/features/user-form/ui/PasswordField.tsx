import { Form, Input } from 'antd'
import { getPasswordRules } from '../model/rules'
import { PasswordChecklist } from './PasswordChecklist'

export const PasswordField = ({ required }: { required: boolean }) => {
  const password: string = Form.useWatch('password') ?? ''

  return (
    <Form.Item
      name="password"
      label="Parol"
      rules={getPasswordRules(required)}
      extra={
        <>
          {!required && "Bo'sh qoldirsangiz, parol o'zgarmaydi"}
          <PasswordChecklist value={password} />
        </>
      }
    >
      <Input.Password placeholder="Parol" autoComplete="new-password" />
    </Form.Item>
  )
}
