import { IsIn, IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js'
import type { ReportStatus } from './reports.mock.js'

export class ReportsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['READY', 'PROCESSING'], { message: "Holat noto'g'ri" })
  status?: ReportStatus

  @IsOptional()
  @IsString({ message: "Qidiruv matn bo'lishi kerak" })
  search?: string
}
