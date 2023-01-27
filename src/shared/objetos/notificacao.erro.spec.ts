import { ErroStub } from '@test/stubs/shared/objetos/erro.stub';
import { NotificacaoErroStub } from '@test/stubs/shared/objetos/notificacao.erro.stub';

describe('NotificacaoErro', () => {
  describe('adicionaErro', () => {
    it('deve adicionar um novo erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      notificacao.adicionaErro(ErroStub.novo());
      expect(notificacao.erros).toHaveLength(1);
    });

    it('não deve adicionar duas vezes o mesmo erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      notificacao.adicionaErro(ErroStub.novo());
      notificacao.adicionaErro(ErroStub.novo());
      expect(notificacao.erros).toHaveLength(1);
    });

    it('deve adicionar mensagem de erro a um erro ja adicionado caso mensagem seja diferente', () => {
      const notificacao = NotificacaoErroStub.novo();
      notificacao.adicionaErro(ErroStub.novo());
      notificacao.adicionaErro(
        ErroStub.custom({ mensagens: ErroStub.ERRO_MENSAGENS_2 }),
      );
      expect(notificacao.erros).toHaveLength(1);
      expect(notificacao.erros[0].mensagens).toHaveLength(2);
    });
  });

  describe('valido', () => {
    it('deve retorna true quando não tiver erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      expect(notificacao.valido()).toBeTruthy();
    });

    it('deve retorna false quando tiver erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      notificacao.adicionaErro(ErroStub.novo());
      expect(notificacao.valido()).toBeFalsy();
    });
  });

  describe('invalido', () => {
    it('deve retorna true quando tiver erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      notificacao.adicionaErro(ErroStub.novo());
      expect(notificacao.invalido()).toBeTruthy();
    });

    it('deve retorna false quando não tiver erro', () => {
      const notificacao = NotificacaoErroStub.novo();
      expect(notificacao.invalido()).toBeFalsy();
    });
  });
});
