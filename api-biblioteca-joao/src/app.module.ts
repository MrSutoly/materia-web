import 'dotenv/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './autores/entities/autor.entity';
import { AutoresModule } from './autores/autores.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { DadosIniciaisService } from './comum/dados-iniciais.service';
import { ErroFilter } from './comum/filtros/erro.filter';
import { RespostaInterceptor } from './comum/interceptors/resposta.interceptor';
import { LogMiddleware } from './comum/middlewares/log.middleware';
import { Emprestimo } from './emprestimos/entities/emprestimo.entity';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { Leitor } from './leitores/entities/leitor.entity';
import { LeitoresModule } from './leitores/leitores.module';
import { Livro } from './livros/entities/livro.entity';
import { LivrosModule } from './livros/livros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_ARQUIVO,
      entities: [Autor, Categoria, Livro, Leitor, Emprestimo],
      synchronize: true,
    }),
    LivrosModule,
    AutoresModule,
    CategoriasModule,
    LeitoresModule,
    EmprestimosModule,
  ],
  providers: [
    DadosIniciaisService,
    { provide: APP_FILTER, useClass: ErroFilter },
    { provide: APP_INTERCEPTOR, useClass: RespostaInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
