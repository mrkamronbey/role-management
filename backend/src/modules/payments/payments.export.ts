import ExcelJS from 'exceljs'
import { formatDateTime } from '../../common/utils/format.js'
import type { createMockPayments } from './payments.mock.js'

export type Payment = ReturnType<typeof createMockPayments>[number]

const UTF8_BOM = '\uFEFF'

export const STATUS_LABELS: Record<Payment['status'], string> = {
  SUCCESS: 'Muvaffaqiyatli',
  PENDING: 'Kutilmoqda',
  FAILED: 'Rad etilgan',
}

const COLUMNS: { header: string; width: number; value: (payment: Payment) => string | number }[] = [
  { header: 'Chek', width: 14, value: (payment) => payment.receiptNumber },
  { header: 'Tranzaksiya ID', width: 16, value: (payment) => payment.transactionId },
  { header: "To'lovchi", width: 18, value: (payment) => payment.payer },
  { header: "To'lovchi hisobi", width: 22, value: (payment) => payment.payerAccount },
  { header: 'Qabul qiluvchi', width: 28, value: (payment) => payment.recipient },
  { header: 'Qabul qiluvchi hisobi', width: 22, value: (payment) => payment.recipientAccount },
  { header: "To'lov maqsadi", width: 34, value: (payment) => payment.purpose },
  { header: 'Summa', width: 16, value: (payment) => payment.amount },
  { header: 'Komissiya', width: 14, value: (payment) => payment.commission },
  { header: 'Valyuta', width: 10, value: (payment) => payment.currency },
  { header: "To'lov usuli", width: 18, value: (payment) => payment.method },
  { header: 'Holat', width: 16, value: (payment) => STATUS_LABELS[payment.status] },
  { header: 'Sana', width: 22, value: (payment) => formatDateTime(payment.createdAt) },
]

const escapeCsv = (value: string | number) => {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export const toCsv = (payments: Payment[]) => {
  const rows = [
    COLUMNS.map((column) => column.header),
    ...payments.map((payment) => COLUMNS.map((column) => column.value(payment))),
  ]
  return UTF8_BOM + rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')
}

export const toXlsx = async (payments: Payment[]) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("To'lovlar")

  sheet.columns = COLUMNS.map((column) => ({ header: column.header, width: column.width }))
  payments.forEach((payment) => sheet.addRow(COLUMNS.map((column) => column.value(payment))))
  sheet.getRow(1).font = { bold: true }
  sheet.views = [{ state: 'frozen', ySplit: 1 }]

  return Buffer.from(await workbook.xlsx.writeBuffer())
}
