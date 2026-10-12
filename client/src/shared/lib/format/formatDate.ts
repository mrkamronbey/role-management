import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (value: string | Date) => dayjs(value).format('DD.MM.YYYY')

export const formatDateTime = (value: string | Date) => dayjs(value).format('DD.MM.YYYY HH:mm')

export const formatRelative = (value: string | Date) => dayjs(value).fromNow()
