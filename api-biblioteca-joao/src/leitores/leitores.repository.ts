import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import { Leitor } from './entities/leitor.entity';

@Injectable()
export class LeitoresRepository {
  constructor(
    @InjectRepository(Leitor)
    private readonly repository: Repository<Leitor>,
    @InjectRepository(Emprestimo)
    private readonly emprestimosRepository: Repository<Emprestimo>,
  ) {}

  buscarPorId(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  buscarPorMatricula(matricula: string) {
    return this.repository.findOne({ where: { matricula: matricula } });
  }

  criar(dados: Partial<Leitor>) {
    const leitor = this.repository.create(dados);
    return this.repository.save(leitor);
  }

  listarEmprestimos(leitorId: number, somenteAbertos: boolean) {
    return this.emprestimosRepository.find({
      where: somenteAbertos
        ? { leitorId: leitorId, dataDevolucao: IsNull() }
        : { leitorId: leitorId },
      relations: { livro: true },
      order: { id: 'ASC' },
    });
  }
}
