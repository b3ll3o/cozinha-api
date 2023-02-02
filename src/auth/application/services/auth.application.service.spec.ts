import { AuthController } from "@auth/controllers/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioCadastradoDtoStub } from "@test/stubs/usuarios/dtos/usuario.cadastrado.dto.stub";
import { UsuarioStub } from "@test/stubs/usuarios/entities/usuario.stub";
import { UsuariosApplicationService } from "@usuarios/application/services/usuarios.application.service";
import { Usuario } from "@usuarios/domain/entities/usuario.entity";
import { UsuariosModule } from "@usuarios/usuarios.module";
import { jwtConstants } from "../strategies/jwt/constants";
import { JwtStrategy } from "../strategies/jwt/jwt.strategy";
import { LocalStrategy } from "../strategies/local/local.strategy";
import { AuthApplicationService } from "./auth.application.service";

describe('AuthApplicationService', () => {

  let service: AuthApplicationService;
  let usuariosService: UsuariosApplicationService;
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthApplicationService, LocalStrategy, JwtStrategy],
      imports: [
        UsuariosModule,
        PassportModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      controllers: [AuthController],
    }).compile();

    usuariosService = module.get(UsuariosApplicationService);
    jwtService = module.get(JwtService);
    service = module.get<AuthApplicationService>(AuthApplicationService);
  });

  describe('validateUser', () => {
    it('deve retorna um usuario quando email e senha estiverem certas', async () => {
      jest.spyOn(usuariosService, 'autentica').mockImplementation(() => Promise.resolve(UsuarioCadastradoDtoStub.novo()))
      const usuario = await service.validateUser(UsuarioStub.USUARIO_EMAIL, UsuarioStub.USUARIO_SENHA)
      expect(usuario.id).toBe(1)
      expect(usuario.email).toBe(UsuarioStub.USUARIO_EMAIL)
    })

    it('deve retorna null quando senha estiver errada', async () => {
      jest.spyOn(usuariosService, 'autentica').mockImplementation(() => Promise.resolve(null))
      const usuario = await service.validateUser(UsuarioStub.USUARIO_EMAIL, 'invalida')
      expect(usuario).toBeNull()
    })

    it('deve retorna null quando email estiver errado', async () => {
      jest.spyOn(usuariosService, 'autentica').mockImplementation(() => Promise.resolve(null))
      const usuario = await service.validateUser('invalido@invalido.com', UsuarioStub.USUARIO_SENHA)
      expect(usuario).toBeNull()
    })
  })

  describe('login', () => {
    it('deve retorna um token de acesso', async () => {
      jest.spyOn(jwtService, 'signAsync').mockImplementation(() => Promise.resolve('abc'))
      const login = await service.login({})
      expect(login.token).toBe('abc')
    })
  })
})