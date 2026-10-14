import { isAxiosError } from 'axios'
import type { ApiErrorBody, FieldError } from './types'

export const getErrorMessage = (error: unknown, fallback = 'Kutilmagan xatolik yuz berdi') => {
  if (isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return "Server bilan bog'lanib bo'lmadi"
    }
    return error.response.data?.message || fallback
  }
  return fallback
}

export const getFieldErrors = (error: unknown): FieldError[] => {
  if (isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.errors ?? []
  }
  return []
}

export const getErrorStatus = (error: unknown) =>
  isAxiosError(error) ? error.response?.status : undefined
