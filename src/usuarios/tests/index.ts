import { Usuario } from '../domain';

export const USUARIO_EMAIL = 'email@email.com';
export const USUARIO_SENHA = 'senha';

export const usuarioFactory = ({
  email = USUARIO_EMAIL,
  senha = USUARIO_SENHA,
}): Usuario =>
  new Usuario({
    email,
    senha,
  });
