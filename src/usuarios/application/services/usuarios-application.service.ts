import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService, Usuario } from '../../domain';
import { NovoUsuarioDto, UsuarioCadastradoDto } from '../dtos';

@Injectable()
export class UsuariosApplicationService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cadastra(
    novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    const { email, senha } = novoUsuarioDto;
    const usuario = await this.usuariosService.cadastra(
      new Usuario({ email, senha }),
    );
    if (usuario.invalido()) {
      throw new BadRequestException(usuario.erros);
    }
    return new UsuarioCadastradoDto(usuario);
  }

  async autentica(email: string, senha: string): Promise<UsuarioCadastradoDto | undefined> {
    const usuario = await this.usuariosService.autentica(new Usuario({ email, senha }));
    if (usuario.invalido()) { 
      return undefined
    }
    const { id} = usuario;
    return new UsuarioCadastradoDto({id, email});
  }
}
