# Foydalanuvchilar va rollarni boshqarish tizimi

Foydalanuvchilarni va ularning rollarini boshqaradigan fullstack web-ilova. Ilovaga JWT orqali kiriladi. Har bir sahifa va endpoint rol bilan himoyalangan: **ADMIN** foydalanuvchilarni boshqaradi, **PAYMENT** to'lovlarni, **REPORTS** hisobotlarni ko'radi.

| Qism | Texnologiyalar |
|---|---|
| Backend (`backend/`) | Node.js, NestJS, Prisma (ORM), PostgreSQL, JWT, dotenv, class-validator |
| Frontend (`client/`) | React + TypeScript, Vite, Ant Design, TanStack Query, Zustand, Tailwind CSS |

## Talablar

- **Node.js** 20.19+, 22.12+ yoki 24+
- **PostgreSQL** 14+
- **npm**

Yoki faqat [Docker](#docker-bilan-ishga-tushirish).

## Tezkor ishga tushirish

Ikkita terminal kerak: birida backend, ikkinchisida frontend.

```bash
# 1-terminal: backend
cd backend
npm install
cp .env.example .env              # DATABASE_URL ni o'zingizga moslang (pastda)
createdb role_management
npm run db:migrate
npm run db:seed
npm run start:dev                 # http://localhost:3000/api

# 2-terminal: frontend
cd client
npm install
cp .env.example .env
npm run dev                       # http://localhost:5173
```

Brauzerda `http://localhost:5173` ni oching va [test akkauntlardan](#test-akkauntlar) biri bilan kiring.

## Docker bilan ishga tushirish

Node.js va PostgreSQL o'rnatish shart emas, faqat Docker kerak. Bitta buyruq baza, backend va frontendni ko'taradi:

```bash
docker compose up --build
```

| Servis | Manzil | Tavsif |
|---|---|---|
| `client` | http://localhost:8080 | Frontend (nginx) |
| `backend` | http://localhost:3000/api | API. Ishga tushganda migratsiya va seed avtomatik bajariladi |
| `db` | — | PostgreSQL 17, ma'lumotlar `db-data` volume'da saqlanadi |

```bash
docker compose down        # to'xtatish (ma'lumotlar saqlanib qoladi)
docker compose down -v     # to'xtatish va bazani tozalash
```

- Backend bazaga `healthcheck` orqali baza tayyor bo'lgandan keyingina ulanadi.
- Seed qayta ishga tushganda dublikat yaratmaydi, shuning uchun konteynerni qayta ishga tushirish xavfsiz.
- `JWT_SECRET` ni o'zgartirish: `JWT_SECRET=uzun-tasodifiy-matn docker compose up --build`
- 3000 yoki 8080 porti band bo'lsa, avval o'sha jarayonni to'xtating.

---

## Backendni ishga tushirish

### 1. Paketlarni o'rnatish

```bash
cd backend
npm install
```

`npm install` dan keyin `postinstall` scripti `prisma generate` ni avtomatik bajaradi va Prisma Client'ni `src/generated/prisma/` ga yaratadi.

### 2. `.env` sozlash

```bash
cp .env.example .env
```

| O'zgaruvchi | Misol | Tavsif |
|---|---|---|
| `PORT` | `3000` | Server porti |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/role_management` | PostgreSQL manzili: `postgresql://USER:PAROL@HOST:PORT/BAZA` |
| `JWT_SECRET` | uzun tasodifiy matn | JWT imzosi uchun maxfiy kalit |
| `JWT_EXPIRES_IN` | `1d` | Token amal qilish muddati (`1h`, `1d`, `7d`) |
| `CORS_ORIGIN` | `http://localhost:5173` | Frontend manzili, faqat shu manzildan so'rovga ruxsat beriladi |

`JWT_SECRET` uchun tasodifiy kalit yaratish:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

macOS'da Homebrew orqali o'rnatilgan PostgreSQL'da odatda parol bo'lmaydi va foydalanuvchi nomi tizimdagi user nomi bilan bir xil bo'ladi: `postgresql://<whoami>@localhost:5432/role_management`.

`.env` ichida shu kalitlardan biri bo'lmasa, server ishga tushmaydi va qaysi kalit yetishmayotganini aytadi.

### 3. Ma'lumotlar bazasi va migratsiyalar

```bash
createdb role_management
npm run db:migrate
npm run db:seed
```

| Buyruq | Nima qiladi |
|---|---|
| `createdb role_management` | Bo'sh baza yaratadi. Muqobil: `psql -c "CREATE DATABASE role_management"` |
| `npm run db:migrate` | `prisma/migrations/` dagi migratsiyalarni bajaradi (`prisma migrate deploy`). Jadvallar: `users`, `roles`, `user_roles`, `access_requests` |
| `npm run db:seed` | ADMIN, PAYMENT, REPORTS rollarini va test akkauntlarni yaratadi. Qayta ishga tushirish xavfsiz: dublikat yaratmaydi |

Baza tuzilishi `prisma/schema.prisma` faylida yozilgan. Migratsiyaning SQL kodi `prisma/migrations/<sana>_init/migration.sql` da.

### 4. Serverni ishga tushirish

```bash
npm run start:dev                 # development, fayl o'zgarsa qayta ishga tushadi
```

Production:

```bash
npm run build
npm run start:prod
```

API manzili: `http://localhost:3000/api`

### Backend buyruqlari

| Buyruq              | Vazifasi |

| `npm run start:dev` | Development server |
| `npm run build` | Production build (`dist/`) |
| `npm run start:prod` | Build qilingan serverni ishga tushirish |
| `npm run db:migrate` | Migratsiyalarni bajarish |
| `npm run db:seed` | Rollar va test akkauntlar |
| `npm run db:studio` | Bazani brauzerda ko'rish (Prisma Studio) |
| `npm run lint` | Linter (oxlint) |
| `npm run format` | Prettier |

---

## Frontendni ishga tushirish

### 1. Paketlarni o'rnatish

```bash
cd client
npm install
```

### 2. `.env` sozlash

```bash
cp .env.example .env
```

| O'zgaruvchi | Default | Tavsif |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | Backend API manzili |

### 3. Development server

```bash
npm run dev                       # http://localhost:5173
```

### 4. Build

```bash
npm run build                     # tip tekshiruvi va production build (dist/)
npm run preview                   # build natijasini lokal ko'rish
```

### Frontend buyruqlari

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Build natijasini ko'rish |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

Frontend haqida batafsil: [client/README.md](client/README.md).

---

## Test akkauntlar

`npm run db:seed` yaratadi. Hammasining paroli: **`Parol123!`**

| Email | Rollar | Ko'radigan sahifalar |
|---|---|---|
| `admin@example.com` | ADMIN | Hammasi (foydalanuvchilar, kirish so'rovlari, to'lovlar, hisobotlar) |
| `payment@example.com` | PAYMENT | To'lovlar |
| `reports@example.com` | REPORTS | Hisobotlar |
| `both@example.com` | PAYMENT, REPORTS | To'lovlar va hisobotlar |
| `noroles@example.com` | — | Hech qaysi; administratordan rol so'rashi mumkin |

---

## API

Barcha manzillar `/api` bilan boshlanadi. Himoyalangan so'rovlarda header: `Authorization: Bearer <token>`.

| Method | Manzil | Kim uchun | Vazifasi |
|---|---|---|---|
| POST | `/auth/login` | Hamma | Login, `{ accessToken, user }` qaytaradi |
| GET | `/auth/me` | Login qilgan | Joriy foydalanuvchi va uning rollari |
| GET | `/users?search=&role=&from=&to=&page=&limit=` | ADMIN | Ro'yxat: qidiruv, rol filtri, ro'yxatdan o'tgan sana bo'yicha filtr, pagination |
| GET | `/users/:id` | ADMIN | Bitta foydalanuvchi |
| POST | `/users` | ADMIN | Yaratish |
| PATCH | `/users/:id` | ADMIN | Tahrirlash (parol bo'sh bo'lsa o'zgarmaydi) |
| DELETE | `/users/:id` | ADMIN | O'chirish |
| GET | `/roles` | ADMIN | Rollar ro'yxati |
| GET | `/payments?from=&to=&status=&search=&page=&limit=` | PAYMENT | Mock to'lovlar: sana oralig'i, holat, qidiruv |
| GET | `/payments/summary?from=&to=` | PAYMENT | Davr bo'yicha statistika: jami summa, holatlar soni |
| GET | `/payments/export?format=csv\|xlsx&status=&from=&to=&search=` | PAYMENT | Filtrlangan hamma to'lovlarni CSV yoki Excel fayl qilib yuklab olish |
| GET | `/payments/:id/receipt` | PAYMENT | Bitta to'lov chekini PDF qilib yuklab olish |
| GET | `/reports?status=&type=&period=YYYY-MM&search=&page=&limit=` | REPORTS | Mock hisobotlar (holat, tur, oy, nomi bo'yicha qidiruv) |
| GET | `/reports/:id/download` | REPORTS | Tayyor hisobotni o'z formatida (PDF yoki XLSX) yuklab olish |
| GET | `/access-requests?status=pending\|reviewed&search=&role=&from=&to=&page=&limit=` | ADMIN | Rol so'rovlari (xodim ismi/email bo'yicha qidiruv, rol va yuborilgan sana bo'yicha filtr) |
| GET | `/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD` | ADMIN | Bosh sahifa uchun hamma ma'lumot (stat kartalar, chart'lar, oxirgi ro'yxatlar) tanlangan davr bo'yicha. Davr berilmasa, oxirgi 30 kun |
| GET | `/access-requests/my` | Login qilgan | O'z so'rovlari va ularning holati |
| POST | `/access-requests` | Login qilgan | Rol so'rash |
| PATCH | `/access-requests/:id/approve` | ADMIN | Tasdiqlash (rol biriktiriladi) |
| PATCH | `/access-requests/:id/reject` | ADMIN | Rad etish |

**Javob formati:**

```json
{ "success": true, "data": { }, "message": "Foydalanuvchi yaratildi" }
{ "success": false, "statusCode": 409, "message": "Bunday email bilan foydalanuvchi allaqachon mavjud", "errors": [{ "field": "email", "message": "..." }] }
```

`errors` faqat maydonga bog'liq xatolarda keladi (validatsiya, band email). Frontend xatoni shu maydon ostida ko'rsatadi.

**Pagination.** `/roles` dan boshqa barcha ro'yxatlar sahifalab qaytadi: `?page=1&limit=10` (default qiymatlar, `limit` ko'pi bilan 100).

```json
{ "success": true, "data": { "items": [ ], "total": 120, "page": 1, "limit": 10 }, "message": "Muvaffaqiyatli bajarildi" }
```

---

## Loyiha tuzilishi

```
backend/
├── prisma/
│   ├── schema.prisma        jadvallar (User, Role, UserRole, AccessRequest)
│   ├── migrations/          SQL migratsiyalar
│   └── seed.ts              rollar va test akkauntlar
└── src/
    ├── main.ts, app.module.ts
    ├── config/              .env tekshiruvi
    ├── prisma/              PrismaService
    ├── common/              guard, interceptor, filter, pipe, dekoratorlar
    └── modules/             auth, users, roles, payments, reports, access-requests

client/src/                  Feature-Sliced Design
├── app/                     provider'lar, router, global stillar
├── pages/                   sahifalar
├── widgets/                 layout
├── features/                foydalanuvchi amallari (login, user-form, ...)
├── entities/                session, user, role, payment, report, access-request
└── shared/                  api, config, lib, ui
```

**Backenddagi NestJS komponentlari:**

| Komponent | Fayl | Vazifasi |
|---|---|---|
| `JwtAuthGuard` | `modules/auth/jwt-auth.guard.ts` | Har bir himoyalangan route'da tokenni tekshiradi (global, ochiq route'lar `@Public()`) |
| `RolesGuard` | `common/guards/roles.guard.ts` | `@Roles()` dekoratori bo'yicha rolni tekshiradi |
| `ResponseInterceptor` | `common/interceptors/response.interceptor.ts` | Javoblarni `{ success, data, message }` ga o'raydi (`message` — `@ResponseMessage()` dan) |
| `LoggingInterceptor` | `common/interceptors/logging.interceptor.ts` | So'rovni va bajarilish vaqtini loglaydi |
| `AllExceptionsFilter` | `common/filters/all-exceptions.filter.ts` | Barcha xatolarni yagona formatga keltiradi |
| `ValidationPipe` | `common/pipes/validation.pipe.ts` | `whitelist`, `forbidNonWhitelisted`, `transform` + DTO'lar |

---

## Qabul qilingan qarorlar

| Masala | Qaror |
|---|---|
| Parol: "kamida 1-8 simvol" | Kamida 8 belgi deb talqin qilindi: kamida 1 ta katta harf (A–Z) va 1 ta maxsus belgi |
| Ism va familiya: "faqat harflar" | Istalgan alifbodagi harflar va o'zbekcha apostroflar (O'tkir, Gʻayrat), 2–50 belgi. Frontend va backend'da bir xil qoida |
| ADMIN roli | Faqat seed orqali beriladi. Formada tanlab bo'lmaydi, API ham qabul qilmaydi. Admin tahrirlanganda ADMIN roli saqlanib qoladi |
| ADMIN huquqlari | Superuser: barcha sahifa va endpoint'larga qo'shimcha rolsiz kira oladi |
| O'chirish | Administratorni va o'zini o'chirib bo'lmaydi |
| Bir nechta rol | Kamida bitta mos rol yetarli: PAYMENT va REPORTS'li foydalanuvchi ikkala sahifani ko'radi |
| Rollar qayerdan olinadi | JWT'da faqat foydalanuvchi id'si. Rollar har so'rovda bazadan olinadi, shuning uchun rol o'zgarsa darhol kuchga kiradi |
| Email | Kichik harfga o'tkazib saqlanadi: `Ali@Mail.com` va `ali@mail.com` bitta email |
| Login xatolari | TZ'dagi misolga ko'ra alohida: "Bunday email bilan foydalanuvchi mavjud emas" va "Email yoki parol noto'g'ri" |
| Rolsiz foydalanuvchi | Alohida sahifa ko'radi va administratordan rol so'rashi mumkin (kirish so'rovlari) |
| Mock ma'lumotlar | To'lovlar va hisobotlar backend kodida yaratiladi (bazada emas), har safar bir xil |
| Frontend himoyasi | `PrivateRoutes` va `PrivateComponent` faqat interfeys uchun. Haqiqiy tekshiruv backend'dagi guard'larda |
