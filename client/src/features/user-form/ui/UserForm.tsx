import { Alert, Button, Col, Flex, Form, Input, Row, Typography } from 'antd'
import type { User } from '@/entities/user'
import { ROLES } from '@/shared/config'
import { applyServerErrors } from '@/shared/lib/form'
import { useNotify } from '@/shared/lib/hooks'
import { useCreateUser } from '../api/useCreateUser'
import { useUpdateUser } from '../api/useUpdateUser'
import { emailRules, getNameRules } from '../model/rules'
import type { UserFormValues } from '../model/types'
import { PasswordField } from './PasswordField'
import { RolesSelect } from './RolesSelect'

interface UserFormProps {
  user?: User
  onClose: () => void
}

export const UserForm = ({ user, onClose }: UserFormProps) => {
  const [form] = Form.useForm<UserFormValues>()
  const notify = useNotify()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const isEdit = Boolean(user)
  const isAdmin = user?.roles.includes(ROLES.ADMIN)
  const isSaving = createUser.isPending || updateUser.isPending

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    roles: user?.roles.filter((role) => role !== ROLES.ADMIN) ?? [],
  }

  const handleFinish = async (values: UserFormValues) => {
    const data = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      roles: values.roles,
      password: values.password || undefined,
    }

    try {
      if (user) {
        await updateUser.mutateAsync({ id: user.id, dto: data })
        notify.success("O'zgarishlar saqlandi")
      } else {
        await createUser.mutateAsync({ ...data, password: values.password! })
        notify.success("Foydalanuvchi qo'shildi")
      }
      onClose()
    } catch (error) {
      if (!applyServerErrors(form, error)) {
        notify.error(error)
      }
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      className="pt-4"
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item name="firstName" label="Ism" rules={getNameRules('Ism')}>
            <Input placeholder="Ism" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="lastName" label="Familiya" rules={getNameRules('Familiya')}>
            <Input placeholder="Familiya" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="email" label="Email" rules={emailRules}>
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <PasswordField required={!isEdit} />
        </Col>
        <Col xs={24}>
          <Typography.Text strong className="mb-3 block">
            Rollar
          </Typography.Text>
          {isAdmin && (
            <Alert
              type="info"
              showIcon
              className="mb-3"
              title="Administrator roli o'zgartirilmaydi, u barcha bo'limlarga kira oladi"
            />
          )}
          <Form.Item name="roles">
            <RolesSelect />
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="end" gap={8}>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button type="primary" htmlType="submit" loading={isSaving}>
          {isEdit ? 'Saqlash' : "Qo'shish"}
        </Button>
      </Flex>
    </Form>
  )
}
