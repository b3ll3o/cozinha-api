import { Erro } from './erro';

export class NotificacaoErro {
  private _erros: Erro[];

  constructor() {
    this._erros = [];
  }

  get erros(): Erro[] {
    return [...this._erros];
  }

  valido(): boolean {
    return this.erros.length === 0;
  }

  invalido(): boolean {
    return !this.valido();
  }

  adicionaErro(erro: Erro): void {
    const erroAdicionado = this._erros.filter((e) => e.campo === erro.campo)[0];
    if (!erroAdicionado) {
      this._erros.push(erro);
    } else {
      erroAdicionado.adicionaMensagens(erro.mensagens);
      this.atualizaErro(erroAdicionado);
    }
  }

  private atualizaErro(erro: Erro): void {
    this._erros = this._erros.map((e) => (e.campo === erro.campo ? erro : e));
  }
}
