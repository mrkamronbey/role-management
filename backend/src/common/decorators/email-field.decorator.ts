import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { toLowerCase } from '../validation/transforms.js'

export const EmailField = () =>
  applyDecorators(
    IsNotEmpty({ message: 'Email kiritilishi shart' }),
    IsEmail({}, { message: "Email noto'g'ri formatda (masalan: example@gmail.com)" }),
    Transform(toLowerCase),
  )
