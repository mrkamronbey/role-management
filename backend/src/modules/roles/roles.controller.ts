import { Controller, Get } from '@nestjs/common'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { PrismaService } from '../../prisma/prisma.service.js'

@Roles(RoleName.ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.role.findMany({ orderBy: { id: 'asc' } })
  }
}
