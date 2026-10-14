import { ForbiddenException } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { describe, expect, it, vi } from 'vitest'
import type { PrismaService } from '../../prisma/prisma.service.js'
import type { UsersService } from '../users/users.service.js'
import { AuthService } from './auth.service.js'

const createService = (rolesCount: number, lastRequest: object | null) => {
  const prisma = {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        passwordHash: bcrypt.hashSync('Parol123!', 4),
      }),
    },
    userRole: { count: vi.fn().mockResolvedValue(rolesCount) },
    accessRequest: { findFirst: vi.fn().mockResolvedValue(lastRequest) },
  }
  const usersService = { findByIdOrThrow: vi.fn().mockResolvedValue({ id: 1 }) }
  const jwtService = { signAsync: vi.fn().mockResolvedValue('token') }

  return new AuthService(
    prisma as unknown as PrismaService,
    usersService as unknown as UsersService,
    jwtService as unknown as JwtService,
  )
}

const credentials = { email: 'user@example.com', password: 'Parol123!' }
const rejected = { status: 'REJECTED', role: { name: 'PAYMENT' } }

describe('AuthService.login', () => {
  it("rolsiz va oxirgi so'rovi rad etilgan foydalanuvchini kiritmaydi", async () => {
    const login = createService(0, rejected).login(credentials)

    await expect(login).rejects.toBeInstanceOf(ForbiddenException)
    await expect(login).rejects.toThrow('"To\'lovlar" roliga yuborgan so\'rovingiz')
  })

  it('roli bor foydalanuvchini kiritadi', async () => {
    await expect(createService(1, rejected).login(credentials)).resolves.toMatchObject({
      accessToken: 'token',
    })
  })

  it("so'rovi kutilayotgan rolsiz foydalanuvchini kiritadi", async () => {
    const pending = { status: 'PENDING', role: { name: 'PAYMENT' } }
    await expect(createService(0, pending).login(credentials)).resolves.toBeDefined()
  })
})
