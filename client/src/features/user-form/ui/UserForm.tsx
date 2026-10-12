import { App, Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { RoleTag } from '@/entities/role'
import type { User } from '@/entities/user'
import { getErrorMessage } from '@/shared/api'
import { ROLES, ROUTES } from '@/shared/config'
import { applyServerErrors } from '@/shared/lib/form'
import { useCreateUser } from '../api/useCreateUser'
import { useUpdateUser } from '../api/useUpdateUser'
import { emailRules, getNameRules } from '../model/rules'
import type { UserFormValues } from '../model/types'
import { PasswordField } from './PasswordField'
import { RolesSelect } from './RolesSelect'

interface UserFormProps {
  user?: User
}

export const UserForm = ({ user }: UserFormProps) => {
  const [form] = Form.useForm<UserFormValues>()
  const navigate = useNavigate()
  const { message } = App.useApp()
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
        message.success("O'zgarishlar saqlandi")
      } else {
        await createUser.mutateAsync({ ...data, password: values.password! })
        message.success('Foydalanuvchi yaratildi')
      }
      navigate(ROUTES.users)
    } catch (error) {
      if (!applyServerErrors(form, error)) {
        message.error(getErrorMessage(error))
      }
    }
  }

  return (
    <Card className="max-w-3xl">
      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
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
          <Col span={24}>
            <Form.Item name="roles" label="Rollar">
              <RolesSelect />
            </Form.Item>
            {isAdmin && (
              <Flex align="center" gap={8} className="-mt-4 mb-6">
                <RoleTag role={ROLES.ADMIN} />
                <Typography.Text type="secondary">
                  Administrator roli o'zgartirilmaydi
                </Typography.Text>
              </Flex>
            )}
          </Col>
        </Row>

        <Flex justify="end" gap={8}>
          <Button onClick={() => navigate(ROUTES.users)}>Bekor qilish</Button>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            {isEdit ? 'Saqlash' : 'Yaratish'}
          </Button>
        </Flex>
      </Form>
    </Card>
  )
}
