import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '@usuarios/usuarios.module';
import { AuthApplicationService } from './application/services/auth.application.service';
import { jwtConstants } from './application/strategies/jwt/constants';
import { JwtStrategy } from './application/strategies/jwt/jwt.strategy';
import { LocalStrategy } from './application/strategies/local/local.strategy';

@Module({
  providers: [AuthApplicationService, LocalStrategy, JwtStrategy],
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AuthModule {}
