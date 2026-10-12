interface ApiConfig {
  getToken: () => string | null
  onUnauthorized: () => void
}

export const apiConfig: ApiConfig = {
  getToken: () => null,
  onUnauthorized: () => {},
}

export const configureApi = (config: ApiConfig) => {
  apiConfig.getToken = config.getToken
  apiConfig.onUnauthorized = config.onUnauthorized
}
