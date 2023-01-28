import { ValidationPipe } from '@nestjs/common';
import { BadRequestCustomException } from '@shared/exceptions/bad.request.custom.exception';
import { Erro } from '@shared/objetos/erro';

export class ValidationCustomPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      exceptionFactory(errors) {
        const erros = errors.map((error) => {
          const mensagens: string[] = [];
          for (const i in error.constraints) {
            mensagens.push(error.constraints[i]);
          }
          return new Erro(error.property, mensagens);
        });
        throw new BadRequestCustomException(erros);
      },
    });
  }
}
