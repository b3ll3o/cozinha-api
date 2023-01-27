import { UsuarioStub } from '@test/stubs/usuarios/entities/usuario.stub';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

describe('UsuariosService', () => {
  let repository: Repository<Usuario>;
  let service: UsuariosService;

  beforeAll(async () => {
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

    repository = module.get(getRepositoryToken(Usuario));
    service = new UsuariosService(repository);
  });

  describe('cadastra', () => {
    it('deve cadastrar um novo usuario', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.cadastra(UsuarioStub.novo({}));
      expect(usuario.id).not.toBeUndefined();
      expect(usuario.email).not.toBeUndefined();
      expect(usuario.email).toBe(UsuarioStub.USUARIO_EMAIL);
      expect(usuario.senha).toBeUndefined();
    });

    it('não deve cadastrar duas vezes o mesmo email', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.cadastra(UsuarioStub.novo({}));
      expect(usuario.id).toBeUndefined();
      expect(usuario.email).not.toBeUndefined();
      expect(usuario.email).toBe(UsuarioStub.USUARIO_EMAIL);
      expect(usuario.senha).toBeUndefined();
    });
  });
});
