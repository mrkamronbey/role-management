import type { User } from '../model/types'

export const getFullName = (user: Pick<User, 'firstName' | 'lastName'>) =>
  `${user.firstName} ${user.lastName}`.trim()

export const getInitials = (user: Pick<User, 'firstName' | 'lastName'>) =>
  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
