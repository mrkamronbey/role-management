import type { Prisma } from '../../generated/prisma/client.js'

export const userSearchWhere = (search: string): Prisma.UserWhereInput => ({
  OR: [
    { firstName: { contains: search, mode: 'insensitive' } },
    { lastName: { contains: search, mode: 'insensitive' } },
    { email: { contains: search, mode: 'insensitive' } },
  ],
})
