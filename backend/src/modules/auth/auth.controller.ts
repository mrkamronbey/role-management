import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { CurrentUser } from '../../common/decorators/current-user.decorator.js'
import { Public } from '../../common/decorators/public.decorator.js'
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js'
import type { User } from '../users/users.select.js'
import { AuthService } from './auth.service.js'
import { LoginDto } from './dto/login.dto.js'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @ResponseMessage('Tizimga muvaffaqiyatli kirildi')
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Get('me')
  me(@CurrentUser() user: User) {
    return user
  }
}
