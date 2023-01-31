import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthApplicationService } from '../application/services/auth.application.service';
import { LocalAuth } from '../application/strategies/local/local.guard.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
  ) {}

  @LocalAuth()
  @Post('login')
  async login(@Request() req) {
    return this.authApplicationService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
