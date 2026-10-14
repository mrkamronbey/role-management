import { IntersectionType } from '@nestjs/mapped-types'
import { IsIn, IsOptional } from 'class-validator'
import { DateRangeQueryDto } from '../../common/dto/date-range-query.dto.js'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js'
import { SearchQueryDto } from '../../common/dto/search-query.dto.js'
import type { PaymentStatus } from './payments.mock.js'

export class PaymentsFilterDto extends IntersectionType(DateRangeQueryDto, SearchQueryDto) {
  @IsOptional()
  @IsIn(['SUCCESS', 'PENDING', 'FAILED'], { message: "Holat noto'g'ri" })
  status?: PaymentStatus
}

export class PaymentsQueryDto extends IntersectionType(PaginationQueryDto, PaymentsFilterDto) {}

export class PaymentsExportQueryDto extends PaymentsFilterDto {
  @IsIn(['csv', 'xlsx'], { message: "Format noto'g'ri" })
  format: 'csv' | 'xlsx' = 'csv'
}
