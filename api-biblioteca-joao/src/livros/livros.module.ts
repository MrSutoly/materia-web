import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import { Livro } from './entities/livro.entity';
import { LivrosController } from './livros.controller';
import { LivrosRepository } from './livros.repository';
import { LivrosService } from './livros.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livro, Emprestimo]),
    AutoresModule,
    CategoriasModule,
  ],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository],
  exports: [LivrosService],
})
export class LivrosModule {}
