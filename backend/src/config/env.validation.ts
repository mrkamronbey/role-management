const REQUIRED_KEYS = ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'CORS_ORIGIN']

export const validateEnv = (config: Record<string, unknown>) => {
  const missing = REQUIRED_KEYS.filter((key) => !config[key])

  if (missing.length > 0) {
    throw new Error(`.env da quyidagilar yo'q: ${missing.join(', ')}`)
  }

  return config
}
