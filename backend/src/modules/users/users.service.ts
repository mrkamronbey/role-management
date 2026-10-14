import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import bcrypt from 'bcryptjs'
import { toDateFilter } from '../../common/utils/date-filter.js'
import type { Prisma } from '../../generated/prisma/client.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { isUniqueViolation } from '../../prisma/is-unique-violation.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import type { CreateUserDto } from './dto/create-user.dto.js'
import type { UpdateUserDto } from './dto/update-user.dto.js'
import type { UsersQueryDto } from './dto/users-query.dto.js'
import { toUser, userSelect, type User } from './users.select.js'

const EMAIL_TAKEN = 'Bunday email bilan foydalanuvchi allaqachon mavjud'

const connectRoles = (roles: RoleName[]) => roles.map((name) => ({ role: { connect: { name } } }))

const throwIfEmailTaken = (error: unknown): never => {
  if (isUniqueViolation(error)) {
    throw new ConflictException({
      message: EMAIL_TAKEN,
      errors: [{ field: 'email', message: EMAIL_TAKEN }],
    })
  }
  throw error
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany({ search, role, from, to, page, limit }: UsersQueryDto) {
    const where: Prisma.UserWhereInput = {
      createdAt: toDateFilter({ from, to }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(role && { roles: { some: { role: { name: role } } } }),
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: userSelect,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ])

    return { items: users.map(toUser), total, page, limit }
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: userSelect })
    return user ? toUser(user) : null
  }

  async findByIdOrThrow(id: number) {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi')
    }
    return user
  }

  async create({ password, roles, ...data }: CreateUserDto) {
    const user = await this.prisma.user
      .create({
        data: {
          ...data,
          passwordHash: await bcrypt.hash(password, 10),
          roles: { create: connectRoles(roles) },
        },
        select: userSelect,
      })
      .catch(throwIfEmailTaken)

    return toUser(user)
  }

  async update(id: number, { password, roles, ...data }: UpdateUserDto) {
    const current = await this.findByIdOrThrow(id)
    const isAdmin = current.roles.includes(RoleName.ADMIN)

    const user = await this.prisma.user
      .update({
        where: { id },
        data: {
          ...data,
          ...(password && { passwordHash: await bcrypt.hash(password, 10) }),
          ...(roles && {
            roles: {
              deleteMany: {},
              create: connectRoles(isAdmin ? [RoleName.ADMIN, ...roles] : roles),
            },
          }),
        },
        select: userSelect,
      })
      .catch(throwIfEmailTaken)

    return toUser(user)
  }

  async remove(id: number, currentUser: User) {
    const user = await this.findByIdOrThrow(id)
    if (user.id === currentUser.id) {
      throw new BadRequestException("O'zingizni o'chira olmaysiz")
    }
    if (user.roles.includes(RoleName.ADMIN)) {
      throw new ForbiddenException("Administratorni o'chirib bo'lmaydi")
    }
    await this.prisma.user.delete({ where: { id } })
    return null
  }
}
