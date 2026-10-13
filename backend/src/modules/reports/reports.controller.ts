import { Controller, Get, Query } from '@nestjs/common'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { ReportsQueryDto } from './reports-query.dto.js'
import { ReportsService } from './reports.service.js'

@Roles(RoleName.REPORTS)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findMany(@Query() query: ReportsQueryDto) {
    return this.reportsService.findMany(query)
  }
}
