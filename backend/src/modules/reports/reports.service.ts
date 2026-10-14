import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { paginate } from '../../common/utils/paginate.js'
import type { ReportsQueryDto } from './reports-query.dto.js'
import { createMockReports } from './reports.mock.js'

@Injectable()
export class ReportsService {
  private readonly reports = createMockReports()

  findMany({ status, type, period, search, ...pagination }: ReportsQueryDto) {
    const text = search?.trim().toLowerCase()

    const reports = this.reports.filter(
      (report) =>
        (!status || report.status === status) &&
        (!type || report.type === type) &&
        (!period || report.periodMonth === period) &&
        (!text || report.title.toLowerCase().includes(text)),
    )

    return paginate(reports, pagination)
  }

  findReady(id: number) {
    const report = this.reports.find((item) => item.id === id)
    if (!report) throw new NotFoundException('Hisobot topilmadi')
    if (report.status !== 'READY') throw new BadRequestException('Hisobot hali tayyor emas')
    return report
  }

  findInPeriod(from: string, to: string) {
    const fromMonth = from.slice(0, 7)
    const toMonth = to.slice(0, 7)
    return this.reports.filter(
      (report) => report.periodMonth >= fromMonth && report.periodMonth <= toMonth,
    )
  }
}
