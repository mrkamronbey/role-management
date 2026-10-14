import { Module } from '@nestjs/common'
import { PaymentsModule } from '../payments/payments.module.js'
import { ReportsModule } from '../reports/reports.module.js'
import { AnalyticsController } from './analytics.controller.js'
import { AnalyticsService } from './analytics.service.js'

@Module({
  imports: [PaymentsModule, ReportsModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
