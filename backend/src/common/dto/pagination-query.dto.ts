import { Type } from 'class-transformer'
import { IsInt, Max, Min } from 'class-validator'

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt({ message: "Sahifa raqami butun son bo'lishi kerak" })
  @Min(1, { message: "Sahifa raqami 1 dan kichik bo'lmasligi kerak" })
  page: number = 1

  @Type(() => Number)
  @IsInt({ message: "Limit butun son bo'lishi kerak" })
  @Min(1, { message: "Limit 1 dan kichik bo'lmasligi kerak" })
  @Max(100, { message: 'Limit 100 dan oshmasligi kerak' })
  limit: number = 10
}
