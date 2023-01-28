import { Erro } from '../erro';
import { NotificacaoErro } from '../notificacao.erro';
import { Entidade } from './entidade';

export abstract class EntidadeNotificavelErro<T> extends Entidade<T> {
  protected notificacaoErro: NotificacaoErro;

  constructor(entidade: Partial<T>) {
    super(entidade);
    this.notificacaoErro = new NotificacaoErro();
  }

  invalido(): boolean {
    return this.notificacaoErro.invalido();
  }

  get erros(): Erro[] {
    return this.notificacaoErro.erros;
  }
}
