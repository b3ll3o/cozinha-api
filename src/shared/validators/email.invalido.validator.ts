import { IsEmail } from 'class-validator';

export const EmailInvalido = () =>
  IsEmail(undefined, { message: 'E-mail inválido.' });
