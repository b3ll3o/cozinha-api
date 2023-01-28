import { BadRequestException } from '@nestjs/common';
import { Erro } from '@shared/objetos/erro';
import { ErroDto } from './dtos/erro.dto';

export class BadRequestCustomException extends BadRequestException {
  constructor(erros: Erro[]) {
    super({ erros: erros.map((e) => new ErroDto(e)) });
  }
}
