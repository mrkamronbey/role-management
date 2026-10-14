import { IsDateString, IsOptional } from 'class-validator'

const DATE_MESSAGE = "Sana YYYY-MM-DD formatida bo'lishi kerak"

export class DateRangeQueryDto {
  @IsOptional()
  @IsDateString({ strict: true }, { message: DATE_MESSAGE })
  from?: string

  @IsOptional()
  @IsDateString({ strict: true }, { message: DATE_MESSAGE })
  to?: string
}
