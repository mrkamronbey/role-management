import { IntersectionType } from '@nestjs/mapped-types'
import { IsIn, IsOptional, Matches } from 'class-validator'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js'
import { SearchQueryDto } from '../../common/dto/search-query.dto.js'
import { REPORT_TYPES, type ReportStatus, type ReportType } from './reports.mock.js'

export class ReportsQueryDto extends IntersectionType(PaginationQueryDto, SearchQueryDto) {
  @IsOptional()
  @IsIn(['READY', 'PROCESSING'], { message: "Holat noto'g'ri" })
  status?: ReportStatus

  @IsOptional()
  @IsIn(REPORT_TYPES, { message: "Hisobot turi noto'g'ri" })
  type?: ReportType

  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: "Davr YYYY-MM formatida bo'lishi kerak" })
  period?: string
}
