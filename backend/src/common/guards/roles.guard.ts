import {
  ForbiddenException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleName } from '../../generated/prisma/enums.js'
import { ROLES_KEY } from '../decorators/roles.decorator.js'
import type { AuthRequest } from '../types/auth-request.js'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<RoleName[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest<AuthRequest>()
    const isAllowed =
      user.roles.includes(RoleName.ADMIN) || roles.some((role) => user.roles.includes(role))

    if (!isAllowed) {
      throw new ForbiddenException("Bu amal uchun ruxsatingiz yo'q")
    }

    return true
  }
}
