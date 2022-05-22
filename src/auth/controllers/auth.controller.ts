import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../domain";
import { LocalAuthGuard } from "../domain/local/local-auth.guard";
import { NoAuth } from "../domain/no-auth";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {

  }

  @NoAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}