import { Objeto } from '@shared/objetos/objeto';

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  id: number;
  email: string;
}
