import { Erro, NotificacaoErro, Objeto } from "../../../shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario extends Objeto<Usuario> {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  email: string
  @Column()
  senha: string

  private notificacaoErros: NotificacaoErro

  constructor(usuario: Partial<Usuario>){
    super(usuario)
    this.notificacaoErros = new NotificacaoErro()
  }

  get erros(){
    return this.notificacaoErros.erros
  }

  public invalido(): boolean {
    return this.notificacaoErros.invalido()
  }

  public valido(): boolean {
    return this.notificacaoErros.valido()
  }

  public podeSerCadastrado(usuario: Usuario): boolean {
    if(!usuario){
      return true 
    }
    this.notificacaoErros.adicionaNovoErro(new Erro({campo: 'email', mensagens: ['Já existe um usuário com esse email']}))
    return this.valido()
  }
}