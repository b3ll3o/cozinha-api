import { Erro } from '@shared/objetos/erro';

export class ErroStub {
  static ERRO_CAMPO = 'campo';
  static ERRO_CAMPO_INVALIDO = '';
  static ERRO_MENSAGENS = ['mensagem de erro'];
  static ERRO_MENSAGENS_2 = ['nova mensagem de erro'];
  static ERRO_MENSAGENS_INVALIDAS = [];

  static novo(): Erro {
    return new Erro(this.ERRO_CAMPO, this.ERRO_MENSAGENS);
  }

  static custom({
    campo = this.ERRO_CAMPO,
    mensagens = this.ERRO_MENSAGENS,
  }): Erro {
    return new Erro(campo, mensagens);
  }
}
