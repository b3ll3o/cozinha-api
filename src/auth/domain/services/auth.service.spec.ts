import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario, UsuariosService } from '../../../usuarios/domain';
import { Connection, getConnection } from 'typeorm';
import { AuthService } from './auth.service';
import { UsuarioCadastradoDto } from '../../../usuarios/application';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constrantes';
import { LocalStrategy } from '../local';
import { JwtStrategy } from '../jwt';
import { AuthController } from '../../../auth/controllers';

const usuarioServiceMock = {
  autentica(
    email: string,
    senha: string,
  ): Promise<UsuarioCadastradoDto | undefined> {
    if (email === undefined || senha === undefined) {
      return undefined;
    }
    return Promise.resolve(new UsuarioCadastradoDto({ id: 1, email }));
  },
};

describe('AuthService', () => {
  let service: AuthService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
        UsuariosModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        {
          provide: UsuariosService,
          useValue: usuarioServiceMock,
        },
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      exports: [AuthService],
      controllers: [AuthController],
    }).compile();

    service = module.get(AuthService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('validateUser', () => {
    it('deve retorna null caso seja invalido', async () => {
      const validateUser = await service.validateUser(undefined, undefined);
      expect(validateUser).toBeNull();
    });

    it('deve retorna um usuario quando for valido', async () => {
      const validateUser = await service.validateUser(
        'email@email.com',
        'senha',
      );
      expect(validateUser).toBeNull();
    });
  });

  describe('login', () => {
    it('deve retorna null caso seja invalido', async () => {
      const login = await service.login(
        new UsuarioCadastradoDto({
          id: 1,
          email: 'email@email.com',
        }),
      );
      expect(login).not.toBeNull();
    });
  });
});
