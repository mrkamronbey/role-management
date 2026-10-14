import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { ROLE_LABELS } from '../../common/constants/roles.js'
import { AccessRequestStatus } from '../../generated/prisma/enums.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import { UsersService } from '../users/users.service.js'
import type { LoginDto } from './dto/login.dto.js'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const account = await this.prisma.user.findUnique({ where: { email } })
    if (!account) {
      throw new NotFoundException('Bunday email bilan foydalanuvchi mavjud emas')
    }

    const isPasswordValid = await bcrypt.compare(password, account.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri")
    }

    await this.ensureNotRejected(account.id)

    const accessToken = await this.jwtService.signAsync({ sub: account.id })
    const user = await this.usersService.findByIdOrThrow(account.id)
    return { accessToken, user }
  }

  private async ensureNotRejected(userId: number) {
    const [rolesCount, lastRequest] = await Promise.all([
      this.prisma.userRole.count({ where: { userId } }),
      this.prisma.accessRequest.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { status: true, role: { select: { name: true } } },
      }),
    ])

    if (rolesCount === 0 && lastRequest?.status === AccessRequestStatus.REJECTED) {
      throw new ForbiddenException(
        `"${ROLE_LABELS[lastRequest.role.name]}" roliga yuborgan so'rovingiz administrator tomonidan rad etildi va sizga hozircha rol biriktirilmagan. Shu sababli tizimga kira olmaysiz`,
      )
    }
  }
}
