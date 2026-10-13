import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map } from 'rxjs'
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator.js'

const DEFAULT_MESSAGE = 'Muvaffaqiyatli bajarildi'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const message =
      this.reflector.get<string | undefined>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      DEFAULT_MESSAGE

    return next
      .handle()
      .pipe(map((data: unknown) => ({ success: true, data: data ?? null, message })))
  }
}
