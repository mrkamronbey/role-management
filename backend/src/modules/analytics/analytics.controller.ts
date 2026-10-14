import { Controller, Get, Query } from '@nestjs/common'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { AnalyticsQueryDto } from './analytics-query.dto.js'
import { AnalyticsService } from './analytics.service.js'

@Roles(RoleName.ADMIN)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getAnalytics(@Query() query: AnalyticsQueryDto) {
    return this.analyticsService.getAnalytics(query)
  }
}
