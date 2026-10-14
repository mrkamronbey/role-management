import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CurrentUser } from '../../common/decorators/current-user.decorator.js'
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { ParseIdPipe } from '../../common/pipes/parse-id.pipe.js'
import { RoleName } from '../../generated/prisma/enums.js'
import type { User } from '../users/users.select.js'
import { AccessRequestsService } from './access-requests.service.js'
import { AccessRequestsQueryDto } from './dto/access-requests-query.dto.js'
import { CreateAccessRequestDto } from './dto/create-access-request.dto.js'

@Controller('access-requests')
export class AccessRequestsController {
  constructor(private readonly accessRequestsService: AccessRequestsService) {}

  @Roles(RoleName.ADMIN)
  @Get()
  findMany(@Query() query: AccessRequestsQueryDto) {
    return this.accessRequestsService.findMany(query)
  }

  @Get('my')
  findMine(@CurrentUser() user: User) {
    return this.accessRequestsService.findMine(user.id)
  }

  @ResponseMessage("So'rov yuborildi")
  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateAccessRequestDto) {
    return this.accessRequestsService.create(user, dto)
  }

  @Roles(RoleName.ADMIN)
  @ResponseMessage("So'rov tasdiqlandi")
  @Patch(':id/approve')
  approve(@Param('id', ParseIdPipe) id: number) {
    return this.accessRequestsService.review(id, true)
  }

  @Roles(RoleName.ADMIN)
  @ResponseMessage("So'rov rad etildi")
  @Patch(':id/reject')
  reject(@Param('id', ParseIdPipe) id: number) {
    return this.accessRequestsService.review(id, false)
  }
}
