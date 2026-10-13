import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import { PrismaClient, RoleName } from '../src/generated/prisma/client.js'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const roles = [
  { name: RoleName.ADMIN, description: 'Administrator' },
  { name: RoleName.PAYMENT, description: "To'lovlar" },
  { name: RoleName.REPORTS, description: 'Hisobotlar' },
]

const users = [
  {
    firstName: 'Kamron',
    lastName: 'Sunnatov',
    email: 'admin@example.com',
    roles: [RoleName.ADMIN],
  },
  {
    firstName: 'Dilnoza',
    lastName: 'Karimova',
    email: 'payment@example.com',
    roles: [RoleName.PAYMENT],
  },
  {
    firstName: 'Jasur',
    lastName: 'Toshmatov',
    email: 'reports@example.com',
    roles: [RoleName.REPORTS],
  },
  {
    firstName: 'Malika',
    lastName: 'Yusupova',
    email: 'both@example.com',
    roles: [RoleName.PAYMENT, RoleName.REPORTS],
  },
  { firstName: 'Sardor', lastName: 'Rahimov', email: 'noroles@example.com', roles: [] },
]

for (const role of roles) {
  await prisma.role.upsert({ where: { name: role.name }, update: {}, create: role })
}

const passwordHash = await bcrypt.hash('Parol123!', 10)

for (const { roles, ...user } of users) {
  await prisma.user.upsert({
    where: { email: user.email },
    update: { passwordHash },
    create: {
      ...user,
      passwordHash,
      roles: { create: roles.map((name) => ({ role: { connect: { name } } })) },
    },
  })
}

console.log('Seed tayyor')
await prisma.$disconnect()
