import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common'
import type { Response } from 'express'

interface FieldError {
  field: string
  message: string
}

interface HttpErrorBody {
  message: string | string[]
  errors?: FieldError[]
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    if (!(exception instanceof HttpException)) {
      this.logger.error(exception)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Serverda kutilmagan xatolik yuz berdi',
      })
      return
    }

    const statusCode = exception.getStatus()
    const body = exception.getResponse()
    const { message, errors } =
      typeof body === 'string' ? { message: body, errors: undefined } : (body as HttpErrorBody)
    const text = Array.isArray(message) ? message[0] : message
    const isUnknownRoute = statusCode === HttpStatus.NOT_FOUND && text.startsWith('Cannot ')

    response.status(statusCode).json({
      success: false,
      statusCode,
      message: isUnknownRoute ? "So'ralgan manzil topilmadi" : text,
      ...(errors && { errors }),
    })
  }
}
