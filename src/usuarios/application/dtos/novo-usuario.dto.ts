import { IsEmail, IsNotEmpty } from 'class-validator';
import { Objeto } from '../../../shared';

export class NovoUsuarioDto extends Objeto<NovoUsuarioDto> {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  senha: string;
}
