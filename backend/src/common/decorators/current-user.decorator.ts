import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { AuthRequest } from '../types/auth-request.js'

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest<AuthRequest>().user,
)
