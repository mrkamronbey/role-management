const DAY = 24 * 60 * 60 * 1000
const PAYMENTS_COUNT = 120

const payers = ['Aloqabank', 'Ipoteka bank', 'Kapitalbank', 'Hamkorbank', 'Agrobank', 'Xalq banki']
const methods = ["Bank o'tkazmasi", 'Humo', 'Uzcard', 'Click']
const statuses = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'PENDING', 'FAILED'] as const

const recipients = [
  { name: "Davlat soliq qo'mitasi", purpose: "Qo'shilgan qiymat solig'i" },
  { name: 'Uztelecom AK', purpose: "Aloqa xizmatlari uchun to'lov" },
  { name: 'Hududgaztaminot AJ', purpose: "Tabiiy gaz uchun to'lov" },
  { name: "O'zbekiston havo yo'llari", purpose: 'Xizmat safari uchun aviachiptalar' },
  { name: 'Artel Electronics MChJ', purpose: "Ofis texnikasi uchun to'lov" },
  { name: 'Toshkent shahar hokimligi', purpose: "Yer ijarasi uchun to'lov" },
  { name: 'Uzbekenergo AJ', purpose: "Elektr energiyasi uchun to'lov" },
]

const maskAccount = (seed: number) =>
  `20208000****${String((seed * 7919) % 10000).padStart(4, '0')}`

export type PaymentStatus = (typeof statuses)[number]

export const createMockPayments = () =>
  Array.from({ length: PAYMENTS_COUNT }, (_, index) => {
    const id = 1000 + index
    const amount = (((index * 7919) % 97) + 3) * 1_250_000
    const recipient = recipients[index % recipients.length]

    return {
      id,
      receiptNumber: `CHK-${id}`,
      transactionId: `TXN-${(id * 48271).toString(36).toUpperCase()}`,
      payer: payers[index % payers.length],
      payerAccount: maskAccount(index + 1),
      recipient: recipient.name,
      recipientAccount: maskAccount(index + 101),
      purpose: recipient.purpose,
      amount,
      commission: Math.round(amount * 0.001),
      currency: 'UZS',
      method: methods[index % methods.length],
      status: statuses[index % statuses.length] as PaymentStatus,
      createdAt: new Date(Date.now() - index * 1.5 * DAY).toISOString(),
    }
  })
