import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthApplicationService } from "../application/services/auth.application.service";
import { JwtAuthGuard } from "../application/services/strategies/jwt/jwt-auth.guard";
import { LocalAuthGuard } from "../application/services/strategies/local/local-auth.guard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authApplicationService: AuthApplicationService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authApplicationService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}