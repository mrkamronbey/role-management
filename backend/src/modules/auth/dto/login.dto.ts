import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: "Email noto'g'ri formatda (masalan: example@gmail.com)" })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string

  @IsString({ message: "Parol matn bo'lishi kerak" })
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  password: string
}
