import { useState } from 'react'
import { KeyOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Select } from 'antd'
import type { CreateAccessRequestDto } from '@/entities/access-request'
import { getErrorMessage } from '@/shared/api'
import { ROLES, ROLE_LABELS, type RoleName } from '@/shared/config'
import { applyServerErrors } from '@/shared/lib/form'
import { useOptions } from '@/shared/lib/hooks'
import { useCreateAccessRequest } from '../api/useCreateAccessRequest'

const REQUESTABLE_ROLES: RoleName[] = [ROLES.PAYMENT, ROLES.REPORTS]

const getRole = (role: RoleName) => role
const getRoleLabel = (role: RoleName) => ROLE_LABELS[role]

export const RequestAccessButton = () => {
  const [open, setOpen] = useState(false)
  const roleOptions = useOptions(REQUESTABLE_ROLES, getRole, getRoleLabel)
  const [form] = Form.useForm<CreateAccessRequestDto>()
  const { message } = App.useApp()
  const createRequest = useCreateAccessRequest()

  const handleClose = () => {
    setOpen(false)
    form.resetFields()
  }

  const handleFinish = async (values: CreateAccessRequestDto) => {
    try {
      await createRequest.mutateAsync({ role: values.role, reason: values.reason.trim() })
      message.success("So'rov yuborildi. Administrator ko'rib chiqadi")
      handleClose()
    } catch (error) {
      if (!applyServerErrors(form, error)) {
        message.error(getErrorMessage(error))
      }
    }
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
