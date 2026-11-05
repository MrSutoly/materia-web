import { HttpException, HttpStatus } from '@nestjs/common';

export class LimiteEmprestimosException extends HttpException {
  codigo = 'LIMITE_EMPRESTIMOS';

  constructor(leitorId: number) {
    super(
      `Leitor ${leitorId} já possui 3 empréstimos em aberto`,
      HttpStatus.CONFLICT,
    );
  }
}
