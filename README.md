# Foydalanuvchilar va rollarni boshqarish tizimi

Foydalanuvchilar va ularning rollarini boshqarish uchun fullstack ilova. Kirish JWT orqali. Har bir sahifa va endpoint rolga qarab ochiladi: ADMIN foydalanuvchilarni boshqaradi, PAYMENT to'lovlarni, REPORTS esa hisobotlarni ko'radi.

- **Backend** (`backend/`): NestJS, Prisma, PostgreSQL, JWT, class-validator
- **Frontend** (`client/`): React, TypeScript, Vite, Ant Design, TanStack Query, Zustand, Tailwind CSS

## Mundarija

- [Talablar](#talablar)
- [Tezkor ishga tushirish](#tezkor-ishga-tushirish)
- [Docker](#docker)
  - [Serverga qo'yish](#serverga-qoyish)
- [Backend](#backend)
- [Frontend](#frontend)
- [Test akkauntlar](#test-akkauntlar)
- [Sahifalar](#sahifalar)
- [API](#api)
- [Loyiha tuzilishi](#loyiha-tuzilishi)

## Talablar

- Node.js 24.15+ (tavsiya, Docker ham shuni ishlatadi), 22.22+ yoki 26+. 20, 23 va 25 versiyalarda ishlamaydi
- PostgreSQL 14+

Docker bilan ishga tushirilsa, bularni hech qaysi kerak emas.

## Tezkor ishga tushirish

Backend va frontend alohida terminalda ishlaydi.

```bash
# backend
cd backend
npm install
cp .env.example .env      # DATABASE_URL ni o'zizniki bilan almashtiring
createdb role_management
npm run db:migrate
npm run db:seed
npm run start:dev         # http://localhost:3000/api
```

```bash
# frontend
cd client
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```

Keyin `http://localhost:5173` ni ochib, [test akkauntlardan](#test-akkauntlar) biri bilan kiring.

## Docker

```bash
docker compose up --build
```

Frontend `http://localhost:8080` da, API `http://localhost:3000/api` da ochiladi. Backend ishga tushganda migratsiya va seed o'zi bajariladi, baza `db-data`da saqlanadi.

```bash
docker compose down       # to'xtatish
docker compose down -v    # bazani ham o'chirish
```

`JWT_SECRET` ni o'zgartirmoqchi bo'lsangiz: `JWT_SECRET=... docker compose up --build`. 3000 yoki 8080 port band bo'lsa, avval uni to'xtatish kerak.

### Serverga qo'yish

`docker-compose.yml` localhost uchun yozilgan. Serverda manzillar boshqa bo'lgani uchun loyiha papkasida `docker-compose.override.yml` ochish kerak, Docker uni o'zi qo'shib o'qiydi:

```yaml
services:
  db:
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  backend:
    environment:
      DATABASE_URL: postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/role_management
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGIN: http://SERVER_IP:8080
    ports: !override
      - '4000:3000'

  client:
    build:
      args:
        VITE_API_URL: http://SERVER_IP:4000/api
```

Parollar yonidagi `.env` da turadi:

```bash
echo "JWT_SECRET=$(openssl rand -hex 32)" > .env
echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)" >> .env
docker compose up -d --build
```

E'tibor berish kerak bo'lgan ikki narsa:

- `VITE_API_URL` build vaqtida frontend kodiga yozib qo'yiladi, o'zgartirgandan keyin `--build` bilan qayta yig'ish kerak.
- `CORS_ORIGIN` brauzerdagi frontend manzili bilan to'liq bir xil bo'lishi kerak (port ham), bo'lmasa login CORS xatosi beradi.

Yangilash uchun `git pull` va yana `docker compose up -d --build`. Baza o'chmaydi.

## Backend

```bash
cd backend
npm install
cp .env.example .env
```

`npm install` dan keyin `prisma generate` o'zi ishlaydi va Prisma Client'ni `src/generated/prisma/` ga yaratadi.

`.env` dagi o'zgaruvchilar:

| O'zgaruvchi | Misol |
|---|---|
| `PORT` | `3000` |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/role_management` |
| `JWT_SECRET` | uzun tasodifiy satr |
| `JWT_EXPIRES_IN` | `1d` |
| `CORS_ORIGIN` | `http://localhost:5173` |

Birortasi yetishmasa, server ishga tushmaydi va qaysi biri yo'qligini yozadi. `JWT_SECRET` uchun:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Homebrew orqali o'rnatilgan PostgreSQL'da odatda parol bo'lmaydi, user nomi esa macOS'dagi user nomingiz bo'ladi: `postgresql://<whoami>@localhost:5432/role_management`.

Baza va boshlang'ich ma'lumotlar:

```bash
createdb role_management    # yoki: psql -c "CREATE DATABASE role_management"
npm run db:migrate          # users, roles, user_roles, access_requests jadvallari
npm run db:seed             # rollar va test akkauntlar
```

Seed'ni qayta ishga tushirsa bo'ladi, dublikat qilmaydi. Faqat test akkauntlar parolini yana `Parol123!` qilib qo'yadi. Sxema `prisma/schema.prisma` da, SQL `prisma/migrations/` da.

Ishga tushirish:

```bash
npm run start:dev                     # development
npm run build && npm run start:prod   # production
```

Boshqa buyruqlar: `npm test` (Vitest), `npm run lint` (oxlint), `npm run format` (Prettier), `npm run db:studio` (Prisma Studio).

## Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

`.env` da bitta o'zgaruvchi bor: `VITE_API_URL=http://localhost:3000/api`. Usiz frontend backend'ni topa olmaydi.

Build:

```bash
npm run build      # tsc + vite build, natija dist/ da
npm run preview    # build'ni lokal ko'rish
```

Boshqa buyruqlar: `npm run lint` (ESLint), `npm run format` (Prettier).

## Test akkauntlar

Seed yaratadi, hammasining paroli `Parol123!`.

| Email | Rol | Nimani ko'radi |
|---|---|---|
| `admin@example.com` | ADMIN | Hammasini |
| `payment@example.com` | PAYMENT | To'lovlar |
| `reports@example.com` | REPORTS | Hisobotlar |
| `both@example.com` | PAYMENT, REPORTS | To'lovlar va hisobotlar |
| `noroles@example.com` | yo'q | Hech narsa, admindan rol so'rashi mumkin |

## Sahifalar

| Route | Kim kiradi |
|---|---|
| `/login` | Hamma |
| `/dashboard` | ADMIN. Qolganlar login'dan keyin o'z bo'limiga tushadi |
| `/users` | ADMIN, qo'shish va tahrirlash modalda |
| `/access-requests` | ADMIN, rol so'rovlarini tasdiqlaydi yoki rad etadi |
| `/payments` | PAYMENT yoki ADMIN |
| `/reports` | REPORTS yoki ADMIN |
| `/profile` | Login qilgan har kim |
| `/no-roles` | Roli yo'q foydalanuvchi, shu yerdan rol so'raydi |
| `/403` | Ruxsat yo'q sahifa |

Bir nechta roli bo'lsa, hamma kerakli sahifalar ochiq bo'ladi. Login'dan keyin birinchi ruxsat berilgan sahifa ochiladi.

## API

Hamma manzillar `/api` dan boshlanadi. Himoyalangan so'rovlarga `Authorization: Bearer <token>` header kerak.

| Method | Manzil | Rol | Nima qiladi |
|---|---|---|---|
| POST | `/auth/login` | hamma | Login, `{ accessToken, user }` qaytaradi |
| GET | `/auth/me` | login | Joriy foydalanuvchi va rollari |
| GET | `/users` | ADMIN | Ro'yxat. `search`, `role`, `from`, `to`, `page`, `limit` |
| GET | `/users/:id` | ADMIN | Bitta foydalanuvchi |
| POST | `/users` | ADMIN | Yaratish |
| PATCH | `/users/:id` | ADMIN | Tahrirlash, parol bo'sh bo'lsa o'zgarmaydi |
| DELETE | `/users/:id` | ADMIN | O'chirish |
| GET | `/roles` | ADMIN | Rollar |
| GET | `/payments` | PAYMENT | Mock to'lovlar. `from`, `to`, `status`, `search`, `page`, `limit` |
| GET | `/payments/summary` | PAYMENT | Davr bo'yicha jami summa va holatlar soni |
| GET | `/payments/export` | PAYMENT | CSV yoki XLSX (`format=csv\|xlsx`), ro'yxatdagi filtrlar bilan |
| GET | `/payments/:id/receipt` | PAYMENT | Chek, PDF |
| GET | `/reports` | REPORTS | Mock hisobotlar. `status`, `type`, `period` (YYYY-MM), `search`, `page`, `limit` |
| GET | `/reports/:id/download` | REPORTS | Hisobot fayli (PDF yoki XLSX) |
| GET | `/access-requests` | ADMIN | Rol so'rovlari. `status` (pending, reviewed), `search`, `role`, `from`, `to` |
| GET | `/access-requests/my` | login | O'zimning so'rovlarim |
| POST | `/access-requests` | login | Rol so'rash |
| PATCH | `/access-requests/:id/approve` | ADMIN | Tasdiqlash, rol biriktiriladi |
| PATCH | `/access-requests/:id/reject` | ADMIN | Rad etish |
| GET | `/analytics` | ADMIN | Bosh sahifa ma'lumotlari. `from`, `to`, berilmasa oxirgi 30 kun |

Javoblar bir xil ko'rinishda keladi:

```json
{ "success": true, "data": {}, "message": "Foydalanuvchi yaratildi" }
{ "success": false, "statusCode": 409, "message": "Bunday email bilan foydalanuvchi allaqachon mavjud", "errors": [{ "field": "email", "message": "..." }] }
```

`errors` faqat aniq maydonga tegishli xatolarda bo'ladi, frontend uni o'sha input tagida chiqaradi.

`/roles` dan boshqa ro'yxatlar sahifalangan: `page=1`, `limit=10` default, `limit` 100 dan oshmaydi. Javobda `{ items, total, page, limit }` qaytadi.

## Loyiha tuzilishi

```
backend/
├── prisma/            schema, migratsiyalar, seed
└── src/
    ├── config/        .env tekshiruvi
    ├── prisma/        PrismaService
    ├── common/        guard, interceptor, filter, pipe, dekoratorlar, umumiy DTO'lar
    └── modules/       auth, users, roles, access-requests, payments, reports, analytics

client/src/            Feature-Sliced Design
├── app/               provider'lar, router, global stillar
├── pages/
├── widgets/           layout
├── features/          auth, user-form, user-delete, access-request-create,
│                      access-request-review, payments-export, theme-toggle
├── entities/          session, user, role, payment, report, access-request, analytics
└── shared/            api, config, lib, ui
```

Frontend'da import faqat pastga qarab ketadi: `app → pages → widgets → features → entities → shared`.

Backend'dagi asosiy NestJS qismlari:

- `JwtAuthGuard` (`modules/auth/jwt-auth.guard.ts`): global, har so'rovda tokenni tekshiradi. Ochiq route'lar `@Public()` bilan belgilanadi.
- `RolesGuard` (`common/guards/roles.guard.ts`): `@Roles()` bo'yicha rolni tekshiradi.
- `ResponseInterceptor`: javobni `{ success, data, message }` ga o'raydi, `message` ni `@ResponseMessage()` dan oladi.
- `LoggingInterceptor`: har bir so'rov va unga ketgan vaqtni yozadi.
- `AllExceptionsFilter`: hamma xatolarni bitta formatga keltiradi.
- `ValidationPipe`: `whitelist`, `forbidNonWhitelisted`, `transform` yoqilgan, DTO'lar bilan ishlaydi.
