import { Injectable } from '@nestjs/common'
import { AccessRequestStatus } from '../../generated/prisma/enums.js'
import { toDateFilter } from '../../common/utils/date-filter.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import { accessRequestSelect, toAccessRequest } from '../access-requests/access-requests.select.js'
import { PaymentsService } from '../payments/payments.service.js'
import { ReportsService } from '../reports/reports.service.js'
import type { AnalyticsQueryDto } from './analytics-query.dto.js'
import { countBy, getDays, getPeriod } from './analytics.utils.js'

type Period = { from: string; to: string }

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
    private readonly reportsService: ReportsService,
  ) {}

  async getAnalytics({ from, to }: AnalyticsQueryDto) {
    const period = getPeriod(from, to)
    const [users, accessRequests] = await Promise.all([
      this.getUsersAnalytics(period),
      this.getAccessRequestsAnalytics(period),
    ])

    return {
      period,
      users,
      accessRequests,
      payments: this.getPaymentsAnalytics(period),
      reports: this.getReportsAnalytics(period),
    }
  }

  private async getUsersAnalytics(period: Period) {
    const createdAt = toDateFilter(period)

    const [total, roles] = await Promise.all([
      this.prisma.user.count({ where: { createdAt } }),
      this.prisma.role.findMany({
        select: {
          name: true,
          _count: { select: { users: { where: { user: { createdAt } } } } },
        },
        orderBy: { id: 'asc' },
      }),
    ])

    return {
      total,
      byRole: roles.map((role) => ({ name: role.name, count: role._count.users })),
    }
  }

  private async getAccessRequestsAnalytics(period: Period) {
    const where = {
      status: AccessRequestStatus.PENDING,
      createdAt: toDateFilter(period),
    }

    const [pending, latest] = await Promise.all([
      this.prisma.accessRequest.count({ where }),
      this.prisma.accessRequest.findMany({
        where,
        select: accessRequestSelect,
        orderBy: { createdAt: 'desc' },
        take: 4,
      }),
    ])

    return { pending, latest: latest.map(toAccessRequest) }
  }

  private getPaymentsAnalytics(period: Period) {
    const payments = this.paymentsService.findInPeriod(period)
    const successful = payments.filter((payment) => payment.status === 'SUCCESS')

    return {
      totalAmount: successful.reduce((sum, payment) => sum + payment.amount, 0),
      latest: payments.slice(0, 5),
      byDay: getDays(period.from, period.to).map((date) => ({
        date,
        amount: successful
          .filter((payment) => payment.createdAt.startsWith(date))
          .reduce((sum, payment) => sum + payment.amount, 0),
      })),
      byStatus: countBy(payments, (payment) => payment.status),
      byMethod: countBy(payments, (payment) => payment.method),
    }
  }

  private getReportsAnalytics(period: Period) {
    const reports = this.reportsService.findInPeriod(period.from, period.to)

    return {
      ready: reports.filter((report) => report.status === 'READY').length,
      byType: countBy(reports, (report) => report.type),
    }
  }
}
