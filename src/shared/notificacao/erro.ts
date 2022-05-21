import { Objeto } from '../classes';

export class Erro extends Objeto<Erro> {
  campo: string;
  mensagens: string[];
}
