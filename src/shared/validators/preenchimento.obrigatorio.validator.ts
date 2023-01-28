import { IsNotEmpty } from 'class-validator';

export const PreenchimentoObrigatorio = () =>
  IsNotEmpty({ message: 'Preenchimento obrigatório.' });
