import { UsuarioCadastradoDto } from "@usuarios/application/dtos/usuario.cadastrado.dto";
import { UsuarioStub } from "../entities/usuario.stub";

export class UsuarioCadastradoDtoStub {
  static novo(): UsuarioCadastradoDto {
    return new UsuarioCadastradoDto({
      id: 1, 
      email: UsuarioStub.USUARIO_EMAIL
    })
  }
}