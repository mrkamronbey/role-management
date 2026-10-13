import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CurrentUser } from '../../common/decorators/current-user.decorator.js'
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js'
import { Roles } from '../../common/decorators/roles.decorator.js'
import { ParseIdPipe } from '../../common/pipes/parse-id.pipe.js'
import { RoleName } from '../../generated/prisma/enums.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { UsersQueryDto } from './dto/users-query.dto.js'
import type { User } from './users.select.js'
import { UsersService } from './users.service.js'

@Roles(RoleName.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMany(@Query() query: UsersQueryDto) {
    return this.usersService.findMany(query)
  }

  @Get(':id')
  findById(@Param('id', ParseIdPipe) id: number) {
    return this.usersService.findByIdOrThrow(id)
  }

  @ResponseMessage('Foydalanuvchi yaratildi')
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }

  @ResponseMessage("Foydalanuvchi ma'lumotlari yangilandi")
  @Patch(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto)
  }

  @ResponseMessage("Foydalanuvchi o'chirildi")
  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number, @CurrentUser() user: User) {
    return this.usersService.remove(id, user)
  }
}
