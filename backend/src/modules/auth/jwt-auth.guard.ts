import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator.js'
import type { AuthRequest } from '../../common/types/auth-request.js'
import { UsersService } from '../users/users.service.js'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<AuthRequest>()
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException("Avtorizatsiyadan o'tilmagan")
    }

    const payload = await this.jwtService.verifyAsync<{ sub: number }>(token).catch(() => {
      throw new UnauthorizedException('Sessiya muddati tugagan, qaytadan kiring')
    })

    const user = await this.usersService.findById(payload.sub)
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi')
    }

    request.user = user
    return true
  }
}
