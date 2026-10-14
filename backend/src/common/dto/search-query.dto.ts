import { IsOptional, IsString } from 'class-validator'

export class SearchQueryDto {
  @IsOptional()
  @IsString({ message: "Qidiruv matn bo'lishi kerak" })
  search?: string
}
