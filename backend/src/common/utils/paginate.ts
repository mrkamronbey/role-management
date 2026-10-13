import type { PaginationQueryDto } from '../dto/pagination-query.dto.js'

export const paginate = <T>(items: T[], { page, limit }: PaginationQueryDto) => ({
  items: items.slice((page - 1) * limit, page * limit),
  total: items.length,
  page,
  limit,
})
