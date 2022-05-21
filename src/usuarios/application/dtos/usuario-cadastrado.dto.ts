import { Objeto } from "../../../shared";

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  id: number;
  email: string;

  constructor(usuario: Partial<UsuarioCadastradoDto>) {
    const { id, email } = usuario;
    super({id, email});
  }
}