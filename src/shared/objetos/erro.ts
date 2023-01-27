export class Erro {
  private _campo: string;
  private _mensagens: string[];

  constructor(campo: string, mensagens: string[]) {
    this.validaCampo(campo);
    this.validaMensagens(mensagens);

    this._campo = campo;
    this._mensagens = mensagens;
  }

  get campo(): string {
    return ''.concat(this._campo);
  }

  get mensagens(): string[] {
    return [...this._mensagens];
  }

  adicionaMensagens(mensagens: string[]): void {
    mensagens.forEach((m) => this.adicionaMensagem(m));
  }

  private adicionaMensagem(mensagem: string): void {
    const mensagemJaAdicionada = this.mensagens.filter(
      (m) => m === mensagem,
    )[0];
    if (!mensagemJaAdicionada) {
      this._mensagens.push(mensagem);
    }
  }

  private validaCampo(campo: string) {
    if (campo === undefined || campo === null || campo === '') {
      throw new Error('Campo inválido.');
    }
  }

  private validaMensagens(mensagens: string[]) {
    if (
      mensagens === undefined ||
      mensagens === null ||
      mensagens.length === 0
    ) {
      throw new Error('Mensagens inválidas.');
    }
  }
}
