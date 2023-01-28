import { Injectable } from '@nestjs/common';
import { BadRequestCustomException } from '@shared/exceptions/bad.request.custom.exception';
import { Usuario } from '@usuarios/domain/entities/usuario.entity';
import { UsuariosService } from '@usuarios/domain/services/usuarios.service';
import { NovoUsuarioDto } from '../dtos/novo.usuario.dto';
import { UsuarioCadastradoDto } from '../dtos/usuario.cadastrado.dto';

@Injectable()
export class UsuariosApplicationService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cadastra(
    novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    const { email, senha } = novoUsuarioDto;
    const usuarioCadastrado = await this.usuariosService.cadastra(
      new Usuario({ email, senha }),
    );
    if (usuarioCadastrado.invalido()) {
      throw new BadRequestCustomException(usuarioCadastrado.erros);
    }
    return new UsuarioCadastradoDto({
      id: usuarioCadastrado.id,
      email: usuarioCadastrado.email,
    });
  }
}
