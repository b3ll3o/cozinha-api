import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

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
    const usuarioSalvo = await this.usuariosRepository.save(usuario);
    usuarioSalvo.senha = undefined;
    return usuarioSalvo;
  }

  async buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }
}
