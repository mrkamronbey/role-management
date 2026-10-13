import {
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import type { Request } from 'express'
import { tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler) {
    const { method, originalUrl } = context.switchToHttp().getRequest<Request>()
    const startedAt = Date.now()
    const log = (status: string) =>
      this.logger.log(`${method} ${originalUrl} ${status} ${Date.now() - startedAt}ms`)

    return next.handle().pipe(
      tap({
        next: () => log('OK'),
        error: (error: { status?: number }) => log(`ERROR ${error.status ?? 500}`),
      }),
    )
  }
}
