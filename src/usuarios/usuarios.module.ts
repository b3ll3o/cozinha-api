import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosApplicationService } from './application/services/usuarios.application.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { Usuario } from './domain/entities/usuario.entity';
import { UsuariosService } from './domain/services/usuarios.service';

@Module({
  providers: [UsuariosService, UsuariosApplicationService],
  controllers: [UsuariosController],
  imports: [TypeOrmModule.forFeature([Usuario])],
  exports:[UsuariosApplicationService]
})
export class UsuariosModule {}
