import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
