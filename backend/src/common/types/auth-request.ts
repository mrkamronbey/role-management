import type { Request } from 'express'
import type { User } from '../../modules/users/users.select.js'

export interface AuthRequest extends Request {
  user: User
}
