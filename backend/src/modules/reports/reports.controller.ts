import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { ParseIdPipe } from '../../common/pipes/parse-id.pipe.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { ReportsQueryDto } from './reports-query.dto.js'
import { buildReportFile } from './reports.files.js'
import { ReportsService } from './reports.service.js'

@Roles(RoleName.REPORTS)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findMany(@Query() query: ReportsQueryDto) {
    return this.reportsService.findMany(query)
  }

  @Get(':id/download')
  async download(@Param('id', ParseIdPipe) id: number, @Res() res: Response) {
    const report = this.reportsService.findReady(id)

    res.attachment(`${report.reportNumber}.${report.format.toLowerCase()}`)
    res.send(await buildReportFile(report))
  }
}
