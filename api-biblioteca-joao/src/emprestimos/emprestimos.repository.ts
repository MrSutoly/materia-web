import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Emprestimo } from './entities/emprestimo.entity';

@Injectable()
export class EmprestimosRepository {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly repository: Repository<Emprestimo>,
  ) {}

  buscarPorId(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  criar(dados: Partial<Emprestimo>) {
    const emprestimo = this.repository.create(dados);
    return this.repository.save(emprestimo);
  }

  salvar(emprestimo: Emprestimo) {
    return this.repository.save(emprestimo);
  }

  contarAbertosPorLivro(livroId: number) {
    return this.repository.count({
      where: { livroId: livroId, dataDevolucao: IsNull() },
    });
  }

  contarAbertosPorLeitor(leitorId: number) {
    return this.repository.count({
      where: { leitorId: leitorId, dataDevolucao: IsNull() },
    });
  }
}
