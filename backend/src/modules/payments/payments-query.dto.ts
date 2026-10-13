import { IntersectionType } from '@nestjs/mapped-types'
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js'
import type { PaymentStatus } from './payments.mock.js'

const DATE_MESSAGE = "Sana YYYY-MM-DD formatida bo'lishi kerak"

export class PaymentsPeriodDto {
  @IsOptional()
  @IsDateString({ strict: true }, { message: DATE_MESSAGE })
  from?: string

  @IsOptional()
  @IsDateString({ strict: true }, { message: DATE_MESSAGE })
  to?: string
}

export class PaymentsQueryDto extends IntersectionType(PaginationQueryDto, PaymentsPeriodDto) {
  @IsOptional()
  @IsIn(['SUCCESS', 'PENDING', 'FAILED'], { message: "Holat noto'g'ri" })
  status?: PaymentStatus

  @IsOptional()
  @IsString({ message: "Qidiruv matn bo'lishi kerak" })
  search?: string
}
