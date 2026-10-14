import type { ReactNode } from 'react'
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { App, Flex, Typography, theme } from 'antd'

interface DialogOptions {
  title: string
  description?: ReactNode
  okText: string
  danger?: boolean
  icon?: ReactNode
}

interface ConfirmOptions extends DialogOptions {
  onOk: () => unknown
}

const useDialogContent = () => {
  const { token } = theme.useToken()

  return ({ title, description, danger, icon }: DialogOptions, defaultIcon: ReactNode) => (
    <Flex vertical align="center" className="pt-2 text-center">
      <span
        className="mb-4 flex size-16 items-center justify-center rounded-full text-3xl"
        style={{
          color: danger ? token.colorError : token.colorPrimary,
          backgroundColor: danger ? token.colorErrorBg : token.colorPrimaryBg,
        }}
      >
        {icon ?? defaultIcon}
      </span>
      <Typography.Title level={4} className="mb-2">
        {title}
      </Typography.Title>
      {description && <Typography.Text type="secondary">{description}</Typography.Text>}
    </Flex>
  )
}

export const useConfirm = () => {
  const { modal } = App.useApp()
  const renderContent = useDialogContent()

  return ({ onOk, ...options }: ConfirmOptions) =>
    modal.confirm({
      centered: true,
      width: 400,
      icon: null,
      content: renderContent(
        options,
        options.danger ? <ExclamationCircleOutlined /> : <QuestionCircleOutlined />,
      ),
      okText: options.okText,
      cancelText: 'Bekor qilish',
      okButtonProps: { danger: options.danger },
      footer: (_, { OkBtn, CancelBtn }) => (
        <Flex gap={8} className="mt-6 [&>button]:flex-1">
          <CancelBtn />
          <OkBtn />
        </Flex>
      ),
      onOk,
    })
}

export const useAlert = () => {
  const { modal } = App.useApp()
  const renderContent = useDialogContent()

  return (options: DialogOptions) =>
    modal.info({
      centered: true,
      width: 400,
      icon: null,
      content: renderContent(
        options,
        options.danger ? <ExclamationCircleOutlined /> : <InfoCircleOutlined />,
      ),
      okText: options.okText,
      okButtonProps: { danger: options.danger },
      footer: (_, { OkBtn }) => (
        <Flex className="mt-6 [&>button]:flex-1">
          <OkBtn />
        </Flex>
      ),
    })
}
