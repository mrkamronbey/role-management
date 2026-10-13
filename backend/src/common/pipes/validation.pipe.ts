import { BadRequestException, ValidationPipe, type ValidationError } from '@nestjs/common'

const toFieldError = (error: ValidationError) => {
  const constraints = error.constraints ?? {}
  const message = constraints.whitelistValidation
    ? `"${error.property}" maydoni qabul qilinmaydi`
    : (Object.values(constraints)[0] ?? "Noto'g'ri qiymat")

  return { field: error.property, message }
}

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (validationErrors) => {
    const errors = validationErrors.map(toFieldError)
    return new BadRequestException({ message: errors[0].message, errors })
  },
})
