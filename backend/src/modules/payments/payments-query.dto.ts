import { IntersectionType } from '@nestjs/mapped-types'
import { IsIn, IsOptional, IsString } from 'class-validator'
import { DateRangeQueryDto } from '../../common/dto/date-range-query.dto.js'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js'
import type { PaymentStatus } from './payments.mock.js'

export class PaymentsFilterDto extends DateRangeQueryDto {
  @IsOptional()
  @IsIn(['SUCCESS', 'PENDING', 'FAILED'], { message: "Holat noto'g'ri" })
  status?: PaymentStatus

  @IsOptional()
  @IsString({ message: "Qidiruv matn bo'lishi kerak" })
  search?: string
}

export class PaymentsQueryDto extends IntersectionType(PaginationQueryDto, PaymentsFilterDto) {}

export class PaymentsExportQueryDto extends PaymentsFilterDto {
  @IsIn(['csv', 'xlsx'], { message: "Format noto'g'ri" })
  format: 'csv' | 'xlsx' = 'csv'
}
