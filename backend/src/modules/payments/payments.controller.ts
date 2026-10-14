import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { DateRangeQueryDto } from '../../common/dto/date-range-query.dto.js'
import { ParseIdPipe } from '../../common/pipes/parse-id.pipe.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { PaymentsExportQueryDto, PaymentsQueryDto } from './payments-query.dto.js'
import { toCsv, toXlsx } from './payments.export.js'
import { buildReceiptPdf } from './payments.receipt.js'
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
  getSummary(@Query() period: DateRangeQueryDto) {
    return this.paymentsService.getSummary(period)
  }

  @Get('export')
  async export(@Query() { format, ...filter }: PaymentsExportQueryDto, @Res() res: Response) {
    const payments = this.paymentsService.findFiltered(filter)
    const fileName = `tolovlar-${new Date().toISOString().slice(0, 10)}.${format}`

    res.attachment(fileName)
    res.send(format === 'xlsx' ? await toXlsx(payments) : toCsv(payments))
  }

  @Get(':id/receipt')
  async receipt(@Param('id', ParseIdPipe) id: number, @Res() res: Response) {
    const payment = this.paymentsService.findById(id)

    res.attachment(`${payment.receiptNumber}.pdf`)
    res.send(await buildReceiptPdf(payment))
  }
}
