import { Erro } from "./erro";

export class NotificacaoErro {

  constructor(private _erros: Erro[] = []) {
    
  }

  get erros(){
    return [ ...this._erros ]
  }

  invalido(): boolean {
    return !this.valido()
  }

  valido(){
    return this._erros.length === 0
  }

  adicionaNovoErro(erro: Erro): void {
    this._erros.push(erro)
  }
}