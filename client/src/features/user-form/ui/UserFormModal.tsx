import { EditOutlined, UserAddOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import type { User } from '@/entities/user'
import { UserForm } from './UserForm'

interface UserFormModalProps {
  open: boolean
  user?: User
  onClose: () => void
}

export const UserFormModal = ({ open, user, onClose }: UserFormModalProps) => (
  <Modal
    open={open}
    title={
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-(--ant-color-primary-bg) text-lg text-(--ant-color-primary)">
          {user ? <EditOutlined /> : <UserAddOutlined />}
        </div>
        <div>
          <div>{user ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'}</div>
          <Typography.Text type="secondary" className="text-sm font-normal">
            {user ? user.email : "Xodim ma'lumotlarini kiriting va unga rol biriktiring"}
          </Typography.Text>
        </div>
      </div>
    }
    footer={null}
    width={640}
    destroyOnHidden
    onCancel={onClose}
  >
    <UserForm user={user} onClose={onClose} />
  </Modal>
)
