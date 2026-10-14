import { Layout, Typography } from 'antd'
import { LoginForm } from '@/features/auth/login'
import { ThemeToggle } from '@/features/theme-toggle'
import { LoginHero } from './LoginHero'

export const LoginPage = () => (
  <Layout className="min-h-screen flex-row bg-(--ant-color-bg-container)">
    <LoginHero />
    <div className="relative flex w-full flex-col p-6 lg:w-[480px] xl:w-[560px]">
      <div className="relative flex justify-end">
        <ThemeToggle />
      </div>

      <div className="relative mx-auto my-auto w-full max-w-sm py-10">
        <Typography.Title level={2} className="mb-2 text-center">
          Tizimga kirish
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="mb-8 text-center">
          Davom etish uchun email va parolingizni kiriting
        </Typography.Paragraph>
        <LoginForm />
      </div>
    </div>
  </Layout>
)
