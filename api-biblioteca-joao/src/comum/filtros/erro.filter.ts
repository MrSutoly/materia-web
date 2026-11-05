import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

const codigosPorStatus: Record<number, string> = {
  400: 'REQUISICAO_INVALIDA',
  404: 'NAO_ENCONTRADO',
  409: 'CONFLITO',
  500: 'ERRO_INTERNO',
};

@Catch()
export class ErroFilter implements ExceptionFilter {
  private readonly logger = new Logger('Erro');

  catch(exception: any, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const req = contexto.getRequest<Request>();
    const res = contexto.getResponse<Response>();

    let status = 500;
    let codigo = codigosPorStatus[500];
    let mensagem = 'Erro interno do servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      codigo = exception['codigo'] || codigosPorStatus[status] || 'ERRO';

      const resposta: any = exception.getResponse();
      if (typeof resposta === 'string') {
        mensagem = resposta;
      } else if (Array.isArray(resposta.message)) {
        mensagem = resposta.message.join('; ');
      } else {
        mensagem = resposta.message;
      }
    } else {
      this.logger.error(exception?.stack || String(exception));
    }

    res.status(status).json({
      sucesso: false,
      erro: {
        status: status,
        codigo: codigo,
        mensagem: mensagem,
      },
      caminho: req.path,
      timestamp: new Date().toISOString(),
    });
  }
}
