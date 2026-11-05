import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const inicio = Date.now();

    res.on('finish', () => {
      const tempo = Date.now() - inicio;
      this.logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${tempo}ms`,
      );
    });

    next();
  }
}
