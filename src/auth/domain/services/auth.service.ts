import { Injectable } from '@nestjs/common';
import {
  UsuarioCadastradoDto,
  UsuariosApplicationService,
} from '../../../usuarios/application';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuarioCadastradoDto =
      await this.usuariosApplicationService.autentica(email, senha);
    if (!usuarioCadastradoDto) {
      return null;
    }
    return usuarioCadastradoDto;
  }

  async login(usuarioCadastradoDto: UsuarioCadastradoDto) {
    const { id, email } = usuarioCadastradoDto;
    const payload = { email: email, sub: id, id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
