import { formatDateTime, formatMoney } from '@/shared/lib/format'
import { PAYMENT_STATUS_META } from '../model/status'
import type { Payment } from '../model/types'

export const getReceiptText = (payment: Payment) =>
  [
    `To'lov cheki: ${payment.receiptNumber}`,
    `Holat: ${PAYMENT_STATUS_META[payment.status].label}`,
    `Sana: ${formatDateTime(payment.createdAt)}`,
    `To'lovchi: ${payment.payer}`,
    `To'lovchi hisobi: ${payment.payerAccount}`,
    `Qabul qiluvchi: ${payment.recipient}`,
    `Qabul qiluvchi hisobi: ${payment.recipientAccount}`,
    `To'lov maqsadi: ${payment.purpose}`,
    `To'lov usuli: ${payment.method}`,
    `Summa: ${formatMoney(payment.amount)}`,
    `Komissiya: ${formatMoney(payment.commission)}`,
    `Jami: ${formatMoney(payment.amount + payment.commission)}`,
    `Tranzaksiya ID: ${payment.transactionId}`,
  ].join('\n')
