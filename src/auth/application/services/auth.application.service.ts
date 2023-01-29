import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuariosApplicationService } from "@usuarios/application/services/usuarios.application.service";

@Injectable()
export class AuthApplicationService {

  constructor(private readonly usuariosApplicationService: UsuariosApplicationService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuariosApplicationService.autentica(email, senha);
    if (usuario) {
      return usuario
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}