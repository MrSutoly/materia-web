import { HttpException, HttpStatus } from '@nestjs/common';

export class SemExemplarException extends HttpException {
  codigo = 'SEM_EXEMPLAR';

  constructor(livroId: number) {
    super(`Livro ${livroId} sem exemplar disponível`, HttpStatus.CONFLICT);
  }
}
