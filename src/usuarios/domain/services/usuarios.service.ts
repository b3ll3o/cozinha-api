import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}
  async cadastra(usuario: Usuario): Promise<Usuario> {
    const usuarioCadastrado = await this.buscaUsuarioPorEmail(usuario.email);
    if (!usuario.podeSerCadastrado(usuarioCadastrado)) {
      usuario.senha = undefined;
      return usuario;
    }
    const hash = await this.geraHashSenha(usuario.senha);
    usuario.senha = hash;
    const usuarioSalvo = await this.usuariosRepository.save(usuario);
    usuarioSalvo.senha = undefined;
    return usuarioSalvo;
  }

  async buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async autentica(usuario: Usuario): Promise<Usuario | undefined> {
    const usuarioCadastrado = await this.buscaUsuarioPorEmail(usuario.email);
    if (usuarioCadastrado) {
      const mesmaSenha = await this.comparaSenha(
        usuarioCadastrado.senha,
        usuario.senha,
      );
      if (mesmaSenha) {
        usuario.senha = undefined;
        return usuario;
      }
      return undefined;
    }
    return undefined;
  }

  private async comparaSenha(hash: string, senha: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }

  private async geraHashSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(senha, salt);
  }
}
