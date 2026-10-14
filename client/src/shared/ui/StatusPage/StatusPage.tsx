import type { ReactNode } from 'react'
import { Card, Divider, Flex, Typography } from 'antd'
import mbLogo from '../../assets/mb-logo.svg'

interface StatusPageProps {
  code?: string
  icon: ReactNode
  title: string
  description: string
  actions?: ReactNode
  fullScreen?: boolean
}

export const StatusPage = ({
  code,
  icon,
  title,
  description,
  actions,
  fullScreen = false,
}: StatusPageProps) => {
  const content = (
    <Flex vertical align="center" className="mx-auto max-w-md py-6 text-center">
      <span className="flex size-20 items-center justify-center rounded-3xl bg-(--ant-color-primary-bg) text-4xl text-(--ant-color-primary)">
        {icon}
      </span>
      {code && (
        <Typography.Text className="mt-4 bg-linear-to-b from-(--ant-color-primary) to-(--ant-color-primary-bg) bg-clip-text text-8xl leading-none font-extrabold text-transparent!">
          {code}
        </Typography.Text>
      )}
      <Typography.Title level={3} className="mt-6 mb-2">
        {title}
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="mb-8 text-base">
        {description}
      </Typography.Paragraph>
      {actions && (
        <Flex wrap justify="center" gap={8}>
          {actions}
        </Flex>
      )}
    </Flex>
  )

  if (!fullScreen) {
    return (
      <Flex align="center" justify="center" className="h-full">
        {content}
      </Flex>
    )
  }

  return (
    <Flex align="center" justify="center" className="min-h-screen bg-(--ant-color-bg-layout) p-4">
      <Card
        variant="borderless"
        className="w-full max-w-xl rounded-3xl"
        styles={{ body: { padding: 40 } }}
      >
        <Flex align="center" justify="center" gap={12}>
          <img src={mbLogo} alt="Logo" className="size-9" />
          <Typography.Text strong className="text-base">
            Boshqaruv tizimi
          </Typography.Text>
        </Flex>
        <Divider className="my-6" />
        {content}
        <Typography.Text type="secondary" className="block text-center text-xs">
          Muammo takrorlansa, administratorga murojaat qiling
        </Typography.Text>
      </Card>
    </Flex>
  )
}
