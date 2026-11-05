import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import { Leitor } from './entities/leitor.entity';
import { LeitoresController } from './leitores.controller';
import { LeitoresRepository } from './leitores.repository';
import { LeitoresService } from './leitores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leitor, Emprestimo])],
  controllers: [LeitoresController],
  providers: [LeitoresService, LeitoresRepository],
  exports: [LeitoresService],
})
export class LeitoresModule {}
