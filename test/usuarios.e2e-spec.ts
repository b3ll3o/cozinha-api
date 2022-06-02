import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuariosModule } from '../src/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuarios/domain';
import { usuarioFactory, USUARIO_EMAIL } from '../src/usuarios/tests';
import { ValidadorPipe } from '../src/shared';

const BASE_URL = '/usuarios';

describe('usuarios', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidadorPipe());
    await app.init();
  });

  describe('cadastraNovoUsuario', () => {
    it('deve cadastrar um novo usuario', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({}))
        .expect(201)
        .expect({
          id: 1,
          email: USUARIO_EMAIL,
        });
    });

    it('não deve cadastrar dois usuarios com o mesmo email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({}))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({ email: '' }))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem senha', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({ senha: '' }))
        .expect(400);
    });
  });
});
