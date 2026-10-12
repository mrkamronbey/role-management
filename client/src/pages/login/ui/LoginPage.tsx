import { CheckCircleFilled, SafetyCertificateFilled } from '@ant-design/icons'
import { Layout, Typography } from 'antd'
import { LoginForm } from '@/features/auth/login'
import { ThemeToggle } from '@/features/theme-toggle'
import { BRAND_COLORS } from '@/shared/config'

const features = [
  'Rollar asosida sahifalarga kirish',
  'JWT orqali xavfsiz autentifikatsiya',
  'Foydalanuvchilar va rollarni boshqarish',
]

export const LoginPage = () => (
  <Layout className="min-h-screen lg:flex-row">
    <aside
      className="hidden flex-col p-12 lg:flex lg:w-1/2"
      style={{ backgroundColor: BRAND_COLORS.dark }}
    >
      <div className="flex items-center gap-3">
        <SafetyCertificateFilled className="text-3xl" style={{ color: BRAND_COLORS.gold }} />
        <span className="text-lg font-semibold text-white">Boshqaruv tizimi</span>
      </div>

      <div className="my-auto max-w-md">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Foydalanuvchilar va rollarni boshqarish
        </h1>
        <p className="mb-8 text-base text-white/60">
          Har bir xodim faqat o'z roliga ruxsat etilgan bo'limlarni ko'radi.
        </p>
        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-white/80">
              <CheckCircleFilled style={{ color: BRAND_COLORS.gold }} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </aside>

    <main className="relative flex flex-1 items-center justify-center p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <SafetyCertificateFilled
          className="mb-6 text-4xl lg:hidden"
          style={{ color: BRAND_COLORS.gold }}
        />
        <Typography.Title level={2} className="mb-2">
          Xush kelibsiz
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="mb-8">
          Tizimga kirish uchun email va parolingizni kiriting
        </Typography.Paragraph>
        <LoginForm />
      </div>
    </main>
  </Layout>
)
