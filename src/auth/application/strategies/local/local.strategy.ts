import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthApplicationService } from '../../services/auth.application.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authApplicationService: AuthApplicationService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const usuario = await this.authApplicationService.validateUser(
      email,
      senha,
    );
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
