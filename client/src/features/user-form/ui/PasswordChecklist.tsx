import { CheckOutlined, MinusOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { PASSWORD_CHECKS } from '../model/rules'

export const PasswordChecklist = ({ value }: { value: string }) => (
  <div className="mt-2 flex flex-col gap-1">
    {PASSWORD_CHECKS.map((check) => {
      const passed = check.test(value)
      return (
        <Typography.Text
          key={check.key}
          type={passed ? 'success' : 'secondary'}
          className="text-xs"
        >
          {passed ? <CheckOutlined /> : <MinusOutlined />} {check.label}
        </Typography.Text>
      )
    })}
  </div>
)
