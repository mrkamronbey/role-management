import { IsIn, IsOptional } from 'class-validator'
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto.js'

export class AccessRequestsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['pending', 'reviewed'], { message: "Holat noto'g'ri" })
  status?: 'pending' | 'reviewed'
}
