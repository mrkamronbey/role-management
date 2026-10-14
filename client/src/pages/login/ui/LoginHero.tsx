import loginBg from '@/shared/assets/login-bg.webp'
import mbLogo from '@/shared/assets/mb-logo.svg'

export const LoginHero = () => (
  <div
    className="relative m-4 hidden flex-1 overflow-hidden rounded-3xl bg-cover bg-position-[20%_center] text-white lg:flex"
    style={{ backgroundImage: `url(${loginBg})` }}
  >
    <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/10 via-55% to-black/80" />

    <div className="relative flex w-full flex-col p-12">
      <div className="flex items-center gap-3">
        <img src={mbLogo} alt="Markaziy bank" className="size-12" />
        <span className="text-sm leading-tight font-medium">Boshqaruv Tizimi</span>
      </div>

      <div className="mt-12 max-w-md">
        <h1 className="mb-4 text-3xl leading-tight font-bold xl:text-4xl">
          Foydalanuvchilar va rollarni boshqarish tizimi
        </h1>
        <p className="text-base text-white/70">
          Xodimlar faqat o'z roliga ruxsat etilgan bo'limlarni ko'radi. Administrator
          foydalanuvchilarni qo'shadi, rollarni biriktiradi va kirish so'rovlarini ko'rib chiqadi.
        </p>
      </div>
    </div>
  </div>
)
