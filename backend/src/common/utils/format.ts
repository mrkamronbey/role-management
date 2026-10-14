const LOCALE = 'ru-RU'
const TIME_ZONE = 'Asia/Tashkent'

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(LOCALE, { timeZone: TIME_ZONE })

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString(LOCALE, { timeZone: TIME_ZONE })
