import { EmailInvalido } from '@shared/validators/email.invalido.validator';
import { PreenchimentoObrigatorio } from '@shared/validators/preenchimento.obrigatorio.validator';

export class NovoUsuarioDto {
  @EmailInvalido()
  email: string;
  @PreenchimentoObrigatorio()
  senha: string;
}
