import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities";

@Injectable()
export class UsuariosService {
  
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async cadastra(novoUsuario: Usuario): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: {email: novoUsuario.email}});
    if(!novoUsuario.podeSerCadastrado(usuario)){
      novoUsuario.senha = undefined
      return novoUsuario
    }
    const usuarioCadastrado = await this.usuarioRepository.save(novoUsuario);
    usuarioCadastrado.senha = undefined
    return usuarioCadastrado
  }
}