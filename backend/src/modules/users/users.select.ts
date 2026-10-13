import type { Prisma } from '../../generated/prisma/client.js'

export const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  roles: { select: { role: { select: { name: true } } }, orderBy: { roleId: 'asc' } },
} satisfies Prisma.UserSelect

type UserWithRoles = Prisma.UserGetPayload<{ select: typeof userSelect }>

export const toUser = ({ roles, ...user }: UserWithRoles) => ({
  ...user,
  roles: roles.map(({ role }) => role.name),
})

export type User = ReturnType<typeof toUser>
