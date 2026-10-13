import { Injectable } from '@nestjs/common'
import { paginate } from '../../common/utils/paginate.js'
import type { ReportsQueryDto } from './reports-query.dto.js'
import { createMockReports } from './reports.mock.js'

@Injectable()
export class ReportsService {
  private readonly reports = createMockReports()

  findMany({ status, search, ...pagination }: ReportsQueryDto) {
    const text = search?.trim().toLowerCase()

    const reports = this.reports.filter(
      (report) =>
        (!status || report.status === status) &&
        (!text || report.title.toLowerCase().includes(text)),
    )

    return paginate(reports, pagination)
  }
}
