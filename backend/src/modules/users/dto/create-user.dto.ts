import { Transform } from 'class-transformer'
import { IsArray, IsEmail, IsIn, IsNotEmpty, Length, Matches, MinLength } from 'class-validator'
import { ASSIGNABLE_ROLES } from '../../../common/constants/roles.js'
import {
  NAME_REGEX,
  SPECIAL_CHAR_REGEX,
  UPPERCASE_REGEX,
} from '../../../common/validation/patterns.js'
import type { RoleName } from '../../../generated/prisma/enums.js'

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value)
const toLowerCase = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value

export class CreateUserDto {
  @Transform(trim)
  @Matches(NAME_REGEX, { message: "Ism faqat harflardan iborat bo'lishi kerak" })
  @Length(2, 50, { message: "Ism 2–50 ta belgidan iborat bo'lishi kerak" })
  @IsNotEmpty({ message: 'Ism kiritilishi shart' })
  firstName: string

  @Transform(trim)
  @Matches(NAME_REGEX, { message: "Familiya faqat harflardan iborat bo'lishi kerak" })
  @Length(2, 50, { message: "Familiya 2–50 ta belgidan iborat bo'lishi kerak" })
  @IsNotEmpty({ message: 'Familiya kiritilishi shart' })
  lastName: string

  @Transform(toLowerCase)
  @IsEmail({}, { message: "Email noto'g'ri formatda (masalan: example@gmail.com)" })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string

  @Matches(SPECIAL_CHAR_REGEX, { message: "Parolda kamida 1 ta maxsus belgi bo'lishi kerak" })
  @Matches(UPPERCASE_REGEX, { message: "Parolda kamida 1 ta katta harf bo'lishi kerak" })
  @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  password: string

  @IsIn(ASSIGNABLE_ROLES, { each: true, message: "ADMIN rolini berib bo'lmaydi" })
  @IsArray({ message: "Rollar ro'yxat ko'rinishida bo'lishi kerak" })
  roles: RoleName[]
}
