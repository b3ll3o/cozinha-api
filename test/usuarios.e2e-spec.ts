import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsuariosModule } from '@usuarios/usuarios.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@usuarios/domain/entities/usuario.entity';
import { UsuarioStub } from '@test/stubs/usuarios/entities/usuario.stub';
import { Repository } from 'typeorm';
import { ValidationCustomPipe } from '@shared/pipes/validation.custom.pipe';

const BASE_URL = '/usuarios';

describe('Usuarios - cadastra', () => {
  let app: INestApplication;
  let repository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'teste_integrado',
          entities: [Usuario],
          synchronize: true,
          autoLoadEntities: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Usuario));

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationCustomPipe());
    await app.init();
  });

  describe('cadastra', () => {
    it('deve cadastrar um novo usuario', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo({}))
        .expect(201)
        .expect({
          id: 1,
          email: UsuarioStub.USUARIO_EMAIL,
        });
    });

    it('não deve cadastrar dois usuarios com o mesmo email', () => {
      repository.save(UsuarioStub.cadastrado());
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo({}))
        .expect(400)
        .expect({
          erros: [
            {
              campo: 'email',
              mensagens: ['Email ja cadastrado.'],
            },
          ],
        });
    });

    it('não deve cadastrar um usuario sem email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo({ email: '' }))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem senha', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo({ senha: '' }))
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
