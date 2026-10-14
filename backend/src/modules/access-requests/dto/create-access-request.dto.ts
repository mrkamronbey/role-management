import { Transform } from 'class-transformer'
import { IsIn, IsString, MinLength } from 'class-validator'
import { ASSIGNABLE_ROLES } from '../../../common/constants/roles.js'
import { trim } from '../../../common/validation/transforms.js'
import type { RoleName } from '../../../generated/prisma/enums.js'

export class CreateAccessRequestDto {
  @IsIn(ASSIGNABLE_ROLES, { message: "Rol noto'g'ri tanlangan" })
  role: RoleName

  @Transform(trim)
  @IsString({ message: "Sabab matn bo'lishi kerak" })
  @MinLength(5, { message: 'Sababni batafsilroq yozing (kamida 5 ta belgi)' })
  reason: string
}
