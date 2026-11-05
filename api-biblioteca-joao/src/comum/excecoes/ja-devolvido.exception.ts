import { HttpException, HttpStatus } from '@nestjs/common';

export class JaDevolvidoException extends HttpException {
  codigo = 'JA_DEVOLVIDO';

  constructor(emprestimoId: number) {
    super(`Empréstimo ${emprestimoId} já foi devolvido`, HttpStatus.CONFLICT);
  }
}
