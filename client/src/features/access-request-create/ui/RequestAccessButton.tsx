import { useState } from 'react'
import { KeyOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import { useMyAccessRequestsQuery, type CreateAccessRequestDto } from '@/entities/access-request'
import { useUserRoles } from '@/entities/session'
import { ROLES, ROLE_LABELS, type RoleName } from '@/shared/config'
import { applyServerErrors } from '@/shared/lib/form'
import { useNotify } from '@/shared/lib/hooks'
import { useCreateAccessRequest } from '../api/useCreateAccessRequest'

const REQUESTABLE_ROLES: RoleName[] = [ROLES.PAYMENT, ROLES.REPORTS]

export const RequestAccessButton = () => {
  const [open, setOpen] = useState(false)
  const userRoles = useUserRoles()
  const { data: myRequests = [] } = useMyAccessRequestsQuery()
  const pendingRoles = myRequests
    .filter((request) => request.status === 'PENDING')
    .map((request) => request.role)
  const roleOptions = REQUESTABLE_ROLES.filter(
    (role) => !userRoles.includes(role) && !pendingRoles.includes(role),
  ).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }))
  const [form] = Form.useForm<CreateAccessRequestDto>()
  const notify = useNotify()
  const createRequest = useCreateAccessRequest()

  const handleClose = () => {
    setOpen(false)
    form.resetFields()
  }

  const handleFinish = async (values: CreateAccessRequestDto) => {
    try {
      await createRequest.mutateAsync({ role: values.role, reason: values.reason.trim() })
      notify.success("So'rov yuborildi. Administrator ko'rib chiqadi")
      handleClose()
    } catch (error) {
      if (!applyServerErrors(form, error)) {
        notify.error(error)
      }
    }
  }

  if (roleOptions.length === 0) {
    return pendingRoles.length > 0 ? (
      <Typography.Text type="secondary">So'rovingiz ko'rib chiqilmoqda</Typography.Text>
    ) : null
  }

  return (
    <>
      <Button icon={<KeyOutlined />} onClick={() => setOpen(true)}>
        Kirish so'rash
      </Button>
      <Modal
        title="Kirish so'rovi"
        open={open}
        onCancel={handleClose}
        onOk={() => form.submit()}
        okText="Yuborish"
        cancelText="Bekor qilish"
        confirmLoading={createRequest.isPending}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
          <Form.Item
            name="role"
            label="Qaysi bo'limga kirish kerak?"
            rules={[{ required: true, message: 'Rolni tanlang' }]}
          >
            <Select placeholder="Rolni tanlang" options={roleOptions} />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Sabab"
            rules={[
              { required: true, whitespace: true, message: 'Sababni yozing' },
              { min: 5, message: 'Kamida 5 ta belgi' },
            ]}
          >
            <Input.TextArea rows={3} maxLength={300} showCount placeholder="Nima uchun kerak?" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
