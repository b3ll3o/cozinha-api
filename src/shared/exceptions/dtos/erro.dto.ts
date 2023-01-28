import { Erro } from '@shared/objetos/erro';

export class ErroDto {
  campo: string;
  mensagens: string[];

  constructor(erro: Erro) {
    this.campo = erro.campo;
    this.mensagens = erro.mensagens;
  }
}
