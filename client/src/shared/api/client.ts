import axios, { type AxiosRequestConfig } from 'axios'
import { env } from '../config'
import { apiConfig } from './configure'
import { ENDPOINTS } from './endpoints'
import type { ApiResponse } from './types'

const apiClient = axios.create({
  baseURL: env.API_URL,
})

apiClient.interceptors.request.use((config) => {
  const token = apiConfig.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config?.url !== ENDPOINTS.auth.login) {
      apiConfig.onUnauthorized()
    }
    return Promise.reject(error)
  },
)

export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.get<ApiResponse<T>>(url, config)
    return response.data.data
  },
  post: async <T>(url: string, body?: unknown) => {
    const response = await apiClient.post<ApiResponse<T>>(url, body)
    return response.data.data
  },
  patch: async <T>(url: string, body?: unknown) => {
    const response = await apiClient.patch<ApiResponse<T>>(url, body)
    return response.data.data
  },
  delete: async <T>(url: string) => {
    const response = await apiClient.delete<ApiResponse<T>>(url)
    return response.data.data
  },
}
