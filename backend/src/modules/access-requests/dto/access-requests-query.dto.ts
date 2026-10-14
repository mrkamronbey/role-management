import { IntersectionType } from '@nestjs/mapped-types'
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator'
import { DateRangeQueryDto } from '../../../common/dto/date-range-query.dto.js'
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto.js'
import { RoleName } from '../../../generated/prisma/enums.js'

export class AccessRequestsQueryDto extends IntersectionType(
  PaginationQueryDto,
  DateRangeQueryDto,
) {
  @IsOptional()
  @IsIn(['pending', 'reviewed'], { message: "Holat noto'g'ri" })
  status?: 'pending' | 'reviewed'

  @IsOptional()
  @IsString({ message: "Qidiruv matn bo'lishi kerak" })
  search?: string

  @IsOptional()
  @IsEnum(RoleName, { message: "Rol noto'g'ri" })
  role?: RoleName
}
