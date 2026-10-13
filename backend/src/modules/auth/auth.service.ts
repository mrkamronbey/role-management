import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
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

    const accessToken = await this.jwtService.signAsync({ sub: account.id })
    const user = await this.usersService.findByIdOrThrow(account.id)
    return { accessToken, user }
  }
}
