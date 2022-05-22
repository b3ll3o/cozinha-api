import { Body, Controller, Post } from '@nestjs/common';
import { NoAuth } from 'src/auth/domain/no-auth';
import {
  NovoUsuarioDto,
  UsuarioCadastradoDto,
  UsuariosApplicationService,
} from '../application';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
  ) {}

  @NoAuth()
  @Post()
  async cadastra(
    @Body() novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    return await this.usuariosApplicationService.cadastra(novoUsuarioDto);
  }
}
