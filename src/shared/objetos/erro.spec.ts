import { ErroStub } from '@test/stubs/shared/objetos/erro.stub';

describe('Erro', () => {
  describe('constructor', () => {
    it('deve criar um novo erro', () => {
      const erro = ErroStub.novo();
      expect(erro.campo).toBe(ErroStub.ERRO_CAMPO);
      expect(erro.mensagens[0]).toBe(ErroStub.ERRO_MENSAGENS[0]);
    });

    it('não deve criar um novo erro com campo invalido', () => {
      expect(() =>
        ErroStub.custom({ campo: ErroStub.ERRO_CAMPO_INVALIDO }),
      ).toThrowError();
    });

    it('não deve criar um novo erro com mensagens invalidas', () => {
      expect(() =>
        ErroStub.custom({ mensagens: ErroStub.ERRO_MENSAGENS_INVALIDAS }),
      ).toThrowError();
    });
  });

  describe('adicionaMensagens', () => {
    it('deve adicionar uma nova mensagem de erro', () => {
      const erro = ErroStub.novo();
      erro.adicionaMensagens(ErroStub.ERRO_MENSAGENS_2);
      expect(erro.mensagens).toHaveLength(2);
    });

    it('não deve adicionar mais de uma vez a mesma mensagem', () => {
      const erro = ErroStub.novo();
      erro.adicionaMensagens(ErroStub.ERRO_MENSAGENS_2);
      erro.adicionaMensagens(ErroStub.ERRO_MENSAGENS_2);
      expect(erro.mensagens).toHaveLength(2);
    });
  });
});
