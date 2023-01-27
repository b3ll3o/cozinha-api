import { EntidadeNotificavelErro } from '@shared/objetos/entidades/entidade.notificavel.erro';
import { Erro } from '@shared/objetos/erro';
import { Column, Entity } from 'typeorm';

@Entity()
export class Usuario extends EntidadeNotificavelErro<Usuario> {
  @Column()
  email: string;
  @Column()
  senha: string;

  podeSerCadastrado(usuario: Usuario): boolean {
    if (!usuario) {
      return true;
    }
    this.notificacaoErro.adicionaErro(
      new Erro('email', ['Email ja cadastrado.']),
    );
    return false;
  }
}
