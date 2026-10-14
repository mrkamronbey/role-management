import loginBg from '@/shared/assets/login-bg.jpg'
import mbLogo from '@/shared/assets/mb-logo.svg'
import { BRAND_COLORS } from '@/shared/config'

export const LoginHero = () => (
  <div
    className="relative m-4 hidden flex-1 overflow-hidden rounded-3xl bg-cover bg-center text-white lg:flex"
    style={{ backgroundImage: `url(${loginBg})` }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to top, ${BRAND_COLORS.dark} 10%, ${BRAND_COLORS.dark}D9 35%, ${BRAND_COLORS.dark}60)`,
      }}
    />

    <div className="relative flex w-full flex-col p-12">
      <div className="flex items-center gap-3">
        <img src={mbLogo} alt="Markaziy bank" className="size-12" />
        <span className="text-sm leading-tight font-medium">Boshqaruv Tizimi</span>
      </div>

      <div className="mt-auto mb-24 max-w-xl">
        <h1 className="mb-4 text-4xl leading-tight font-bold xl:text-5xl">
          Foydalanuvchilar va rollarni boshqarish tizimi
        </h1>
        <p className="text-base text-white/70">
          Xodimlar faqat o'z roliga ruxsat etilgan bo'limlarni ko'radi. Administrator
          foydalanuvchilarni qo'shadi, rollarni biriktiradi va kirish so'rovlarini ko'rib chiqadi.
        </p>
      </div>

      <p className="mt-12 text-xs text-white/50">
        © {new Date().getFullYear()} O'zbekiston Respublikasi Markaziy banki. Barcha huquqlar
        himoyalangan.
      </p>
    </div>
  </div>
)
