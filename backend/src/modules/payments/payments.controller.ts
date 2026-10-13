import { Controller, Get, Query } from '@nestjs/common'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { PaymentsPeriodDto, PaymentsQueryDto } from './payments-query.dto.js'
import { PaymentsService } from './payments.service.js'

@Roles(RoleName.PAYMENT)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findMany(@Query() query: PaymentsQueryDto) {
    return this.paymentsService.findMany(query)
  }

  @Get('summary')
  getSummary(@Query() period: PaymentsPeriodDto) {
    return this.paymentsService.getSummary(period)
  }
}
