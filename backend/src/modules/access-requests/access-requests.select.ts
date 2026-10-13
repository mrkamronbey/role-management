import type { Prisma } from '../../generated/prisma/client.js'

export const accessRequestSelect = {
  id: true,
  reason: true,
  status: true,
  createdAt: true,
  reviewedAt: true,
  role: { select: { name: true } },
  user: { select: { id: true, firstName: true, lastName: true, email: true } },
} satisfies Prisma.AccessRequestSelect

type AccessRequestWithRelations = Prisma.AccessRequestGetPayload<{
  select: typeof accessRequestSelect
}>

export const toAccessRequest = ({ role, ...request }: AccessRequestWithRelations) => ({
  ...request,
  role: role.name,
})
