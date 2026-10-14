import { IntersectionType } from '@nestjs/mapped-types'
import { IsEnum, IsOptional } from 'class-validator'
import { DateRangeQueryDto } from '../../../common/dto/date-range-query.dto.js'
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto.js'
import { SearchQueryDto } from '../../../common/dto/search-query.dto.js'
import { RoleName } from '../../../generated/prisma/enums.js'

export class UsersQueryDto extends IntersectionType(
  PaginationQueryDto,
  DateRangeQueryDto,
  SearchQueryDto,
) {
  @IsOptional()
  @IsEnum(RoleName, { message: "Rol noto'g'ri" })
  role?: RoleName
}
