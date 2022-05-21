import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosApplicationService } from './application';
import { UsuariosController } from './controllers';
import { Usuario, UsuariosService } from './domain';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosApplicationService, UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuariosModule {}
