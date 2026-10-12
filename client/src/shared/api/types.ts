export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface FieldError {
  field: string
  message: string
}

export interface ApiErrorBody {
  success: false
  statusCode: number
  message: string
  errors?: FieldError[]
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  limit: number
}
