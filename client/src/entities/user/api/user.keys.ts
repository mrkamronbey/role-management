import type { UsersParams } from '../model/types'

export const userKeys = {
  all: ['users'],
  list: (params: UsersParams) => ['users', 'list', params],
}
