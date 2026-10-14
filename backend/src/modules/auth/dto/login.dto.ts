import { IsNotEmpty, IsString } from 'class-validator'
import { EmailField } from '../../../common/decorators/email-field.decorator.js'

export class LoginDto {
  @EmailField()
  email: string

  @IsString({ message: "Parol matn bo'lishi kerak" })
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  password: string
}
