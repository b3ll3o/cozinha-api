import { Body, Controller, Post } from '@nestjs/common';
import { NovoUsuarioDto } from '@usuarios/application/dtos/novo.usuario.dto';
import { UsuarioCadastradoDto } from '@usuarios/application/dtos/usuario.cadastrado.dto';
import { UsuariosApplicationService } from '@usuarios/application/services/usuarios.application.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
  ) {}

  @Post()
  async cadastra(
    @Body() novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    return this.usuariosApplicationService.cadastra(novoUsuarioDto);
  }
}
