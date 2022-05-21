import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { Connection, getConnection } from 'typeorm';
import { usuarioFactory, USUARIO_EMAIL } from '../../tests';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    service = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastraNovoUsuario', () => {
    it('deve cadastrar um novo usuario', async () => {
      const usuario = await service.cadastra(usuarioFactory());
      expect(usuario.id).not.toBeUndefined();
      expect(usuario.id).not.toBeNull();
      expect(usuario.email).toBe(USUARIO_EMAIL);
      expect(usuario.senha).toBeUndefined();
      expect(usuario.valido).toBeTruthy();
    });

    it('não deve ser possivel cadastrar dois usuarios com o mesmo email', async () => {
      await service.cadastra(usuarioFactory());
      const usuario = await service.cadastra(usuarioFactory());
      expect(usuario.invalido()).toBeTruthy();
      expect(usuario.erros).toHaveLength(1);
      expect(usuario.erros[0].campo).toBe('email');
      expect(usuario.erros[0].mensagens).toHaveLength(1);
    });
  });
});
