import { Usuario } from "../domain";

export const USUARIO_EMAIL = 'email@email.com';
export const USUARIO_SENHA = 'senha';

export const usuarioFactory = (): Usuario =>
new Usuario({
  email: USUARIO_EMAIL,
  senha: USUARIO_SENHA,
});