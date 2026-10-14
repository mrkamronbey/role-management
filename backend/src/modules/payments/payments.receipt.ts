import { createPdf } from '../../common/utils/documents.js'
import { STATUS_LABELS, formatDate, type Payment } from './payments.export.js'

const formatMoney = (amount: number, currency: string) =>
  `${amount.toLocaleString('ru-RU').replace(/\s/g, ' ')} ${currency}`

export const buildReceiptPdf = (payment: Payment) =>
  createPdf({
    title: "To'lov cheki",
    subtitle: `${payment.receiptNumber} | ${formatDate(payment.createdAt)}`,
    sections: [
      {
        title: "To'lov ma'lumotlari",
        rows: [
          ['Chek raqami', payment.receiptNumber],
          ['Tranzaksiya ID', payment.transactionId],
          ['Holat', STATUS_LABELS[payment.status]],
          ['Sana', formatDate(payment.createdAt)],
          ["To'lov usuli", payment.method],
          ["To'lov maqsadi", payment.purpose],
        ],
      },
      {
        title: 'Tomonlar',
        rows: [
          ["To'lovchi", payment.payer],
          ["To'lovchi hisobi", payment.payerAccount],
          ['Qabul qiluvchi', payment.recipient],
          ['Qabul qiluvchi hisobi', payment.recipientAccount],
        ],
      },
      {
        title: 'Summa',
        rows: [
          ["To'lov summasi", formatMoney(payment.amount, payment.currency)],
          ['Komissiya', formatMoney(payment.commission, payment.currency)],
          ['Jami', formatMoney(payment.amount + payment.commission, payment.currency)],
        ],
      },
    ],
  })
