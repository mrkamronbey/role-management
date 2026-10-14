import { Injectable, NotFoundException } from '@nestjs/common'
import type { DateRangeQueryDto } from '../../common/dto/date-range-query.dto.js'
import { paginate } from '../../common/utils/paginate.js'
import type { PaymentsFilterDto, PaymentsQueryDto } from './payments-query.dto.js'
import { createMockPayments } from './payments.mock.js'

@Injectable()
export class PaymentsService {
  private readonly payments = createMockPayments()

  findMany({ page, limit, ...filter }: PaymentsQueryDto) {
    return paginate(this.findFiltered(filter), { page, limit })
  }

  findFiltered({ status, search, ...period }: PaymentsFilterDto) {
    const text = search?.trim().toLowerCase()

    return this.findInPeriod(period).filter(
      (payment) =>
        (!status || payment.status === status) &&
        (!text ||
          payment.payer.toLowerCase().includes(text) ||
          payment.recipient.toLowerCase().includes(text) ||
          payment.receiptNumber.toLowerCase().includes(text)),
    )
  }

  getSummary(period: DateRangeQueryDto) {
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

  findById(id: number) {
    const payment = this.payments.find((item) => item.id === id)
    if (!payment) throw new NotFoundException("To'lov topilmadi")
    return payment
  }

  findInPeriod({ from, to }: DateRangeQueryDto) {
    return this.payments.filter((payment) => {
      const date = payment.createdAt.slice(0, 10)
      return (!from || date >= from) && (!to || date <= to)
    })
  }
}
