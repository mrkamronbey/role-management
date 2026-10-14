import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (value: string | Date) => dayjs(value).format('DD.MM.YYYY')

export const formatDateTime = (value: string | Date) => dayjs(value).format('DD.MM.YYYY HH:mm')

export const formatRelative = (value: string | Date) => dayjs(value).fromNow()

export const formatDuration = (from: string | Date, to: string | Date) =>
  dayjs(to).diff(from, 'minute') < 1 ? '1 daqiqa' : dayjs(from).to(dayjs(to), true)
