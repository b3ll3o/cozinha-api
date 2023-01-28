import { UsuarioStub } from '@test/stubs/usuarios/entities/usuario.stub';
import { UsuariosService } from '@usuarios/domain/services/usuarios.service';
import { UsuariosApplicationService } from './usuarios.application.service';

describe('UsuariosApplicationService', () => {
  let service: UsuariosApplicationService;
  let usuariosService: UsuariosService;

  beforeAll(() => {
    usuariosService = new UsuariosService(undefined);
    service = new UsuariosApplicationService(usuariosService);
  });

  describe('cadastra', () => {
    it('deve cadastrar um novo usuario', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.cadastra(UsuarioStub.novo({}));
      expect(usuario.id).not.toBeUndefined();
      expect(usuario.email).not.toBeUndefined();
    });

    it('deve jogar um erro quando usuario estiver invalido', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.invalido()));
      expect(
        async () => await service.cadastra(UsuarioStub.novo({})),
      ).rejects.toThrow();
    });
  });
});
