import { Objeto } from '../../../shared';

export class NovoUsuarioDto extends Objeto<NovoUsuarioDto> {
  email: string;
  senha: string;
}
