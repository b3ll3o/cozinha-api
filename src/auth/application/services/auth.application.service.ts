import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioCadastradoDto } from '@usuarios/application/dtos/usuario.cadastrado.dto';
import { UsuariosApplicationService } from '@usuarios/application/services/usuarios.application.service';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<UsuarioCadastradoDto | null> {
    const usuario = await this.usuariosApplicationService.autentica(
      email,
      senha,
    );
    if (usuario) {
      return usuario;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const token = await this.jwtService.signAsync(payload)
    return {
      token
    };
  }
}
