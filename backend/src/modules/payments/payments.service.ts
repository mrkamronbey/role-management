import { Injectable } from '@nestjs/common'
import { paginate } from '../../common/utils/paginate.js'
import type { PaymentsPeriodDto, PaymentsQueryDto } from './payments-query.dto.js'
import { createMockPayments } from './payments.mock.js'

@Injectable()
export class PaymentsService {
  private readonly payments = createMockPayments()

  findMany({ status, search, ...query }: PaymentsQueryDto) {
    const text = search?.trim().toLowerCase()

    const payments = this.findInPeriod(query).filter(
      (payment) =>
        (!status || payment.status === status) &&
        (!text ||
          payment.payer.toLowerCase().includes(text) ||
          payment.recipient.toLowerCase().includes(text) ||
          payment.receiptNumber.toLowerCase().includes(text)),
    )

    return paginate(payments, query)
  }

  getSummary(period: PaymentsPeriodDto) {
    const payments = this.findInPeriod(period)
    const countByStatus = (status: string) =>
      payments.filter((payment) => payment.status === status).length

    return {
      totalAmount: payments
        .filter((payment) => payment.status === 'SUCCESS')
        .reduce((sum, payment) => sum + payment.amount, 0),
      success: countByStatus('SUCCESS'),
      pending: countByStatus('PENDING'),
      failed: countByStatus('FAILED'),
    }
  }

  private findInPeriod({ from, to }: PaymentsPeriodDto) {
    return this.payments.filter((payment) => {
      const date = payment.createdAt.slice(0, 10)
      return (!from || date >= from) && (!to || date <= to)
    })
  }
}
