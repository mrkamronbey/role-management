import { IntersectionType } from '@nestjs/mapped-types'
import { IsEnum, IsIn, IsOptional } from 'class-validator'
import { DateRangeQueryDto } from '../../../common/dto/date-range-query.dto.js'
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto.js'
import { SearchQueryDto } from '../../../common/dto/search-query.dto.js'
import { RoleName } from '../../../generated/prisma/enums.js'

export class AccessRequestsQueryDto extends IntersectionType(
  PaginationQueryDto,
  DateRangeQueryDto,
  SearchQueryDto,
) {
  @IsOptional()
  @IsIn(['pending', 'reviewed'], { message: "Holat noto'g'ri" })
  status?: 'pending' | 'reviewed'

  @IsOptional()
  @IsEnum(RoleName, { message: "Rol noto'g'ri" })
  role?: RoleName
}
