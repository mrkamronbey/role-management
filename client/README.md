# Foydalanuvchilar va rollarni boshqarish — Frontend

React + TypeScript + Vite, Ant Design, TanStack Query, Zustand, Tailwind CSS.

## Ishga tushirish

Talab: Node.js 20.19+ (yoki 22.12+), ishlab turgan backend.

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Ilova `http://localhost:5173` da ochiladi.

### Environment

| O'zgaruvchi | Default | Tavsif |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | Backend API manzili |

## Buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Tip tekshiruvi va production build (`dist/`) |
| `npm run preview` | Build natijasini lokal ko'rish |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Docker

```bash
docker build -t role-management-client --build-arg VITE_API_URL=http://localhost:3000/api .
docker run -p 8080:80 role-management-client
```

Ilova `http://localhost:8080` da ochiladi. `nginx.conf` SPA route'larini `index.html` ga yo'naltiradi.

## Sahifalar

| Route | Kim uchun |
|---|---|
| `/login` | Login qilmagan foydalanuvchi |
| `/dashboard` | `ADMIN` (bosh sahifa). Boshqa rollar login'dan keyin o'z bo'limiga (To'lovlar / Hisobotlar) tushadi |
| `/users` (qo'shish va tahrirlash modal oynada) | `ADMIN` |
| `/access-requests` | `ADMIN` (kirish so'rovlarini tasdiqlash / rad etish) |
| `/payments` | `PAYMENT` (yoki `ADMIN`) |
| `/reports` | `REPORTS` (yoki `ADMIN`) |
| `/profile` | Har bir login qilgan foydalanuvchi: shaxsiy ma'lumotlar va ochiq bo'limlar |
| `/403` | Ruxsat yo'q |
| `/no-roles` | Hech qanday roli yo'q foydalanuvchi ("Kirish so'rash" tugmasi bilan) |

Bir nechta roli bor foydalanuvchi kerakli sahifalarni ko'radi. Login'dan keyin birinchi ruxsati bor sahifa ochiladi.

## Tuzilma (Feature-Sliced Design)

```
src/
├── app/        provider'lar, router, global stillar
├── pages/      sahifalar
├── widgets/    layout, foydalanuvchilar jadvali
├── features/   login, logout, user-form, user-delete, theme-toggle
├── entities/   session, user, role, payment, report
└── shared/     api, config, lib, ui
```

Import faqat yuqoridan pastga yo'naladi: `app → pages → widgets → features → entities → shared`.

## Qabul qilingan qarorlar

- **Parol:** TZ dagi "kamida 1-8 simvol" kamida 8 ta belgi deb talqin qilindi: kamida 1 ta katta harf (A–Z) va 1 ta maxsus belgi.
- **Ism va familiya:** faqat harflar va o'zbekcha apostroflar (O'tkir, Gʻayrat), 2–50 belgi.
- **ADMIN roli:** formada tanlab bo'lmaydi va olib tashlab bo'lmaydi. Administrator va joriy foydalanuvchini o'chirib bo'lmaydi.
- **ADMIN** superuser: barcha sahifalarni qo'shimcha rolsiz ko'radi.
- **Sessiya:** token cookie'da saqlanadi (`js-cookie`, 1 kun, `sameSite: 'strict'`). Sahifa yangilanganda foydalanuvchi va rollar `/auth/me` dan qayta olinadi. 401 javobida sessiya tozalanadi.
- **Frontend'dagi himoya** (`PrivateRoutes`, `PrivateComponent`) faqat interfeys uchun. Haqiqiy tekshiruv backend'dagi Guard'larda.

## Rasmlar

Login sahifasidagi fon rasmi (`src/shared/assets/login-bg.jpg`): Toshkent, Nest One. Muallif: [Iskandar Kambaraliyev](https://unsplash.com/@takhirjanovich), [Unsplash](https://unsplash.com/photos/U6UuPXyyINo) (Unsplash License, bepul foydalanish mumkin).
