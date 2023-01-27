import { Usuario } from '@usuarios/domain/entities/usuario.entity';

export class UsuarioStub {
  static USUARIO_EMAIL = 'email@email.com';
  static USUARIO_SENHA = 'senha';

  static novo({
    email = this.USUARIO_EMAIL,
    senha = this.USUARIO_SENHA,
  }): Usuario {
    return new Usuario({
      email,
      senha,
    });
  }

  static cadastrado() {
    return new Usuario({
      id: 1,
      email: this.USUARIO_EMAIL,
      senha: this.USUARIO_SENHA,
    });
  }
}
