import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import { Livro } from './entities/livro.entity';

@Injectable()
export class LivrosRepository {
  constructor(
    @InjectRepository(Livro)
    private readonly repository: Repository<Livro>,
    @InjectRepository(Emprestimo)
    private readonly emprestimosRepository: Repository<Emprestimo>,
  ) {}

  listar(categoria?: string, autor?: string, disponivel?: boolean) {
    const consulta = this.repository
      .createQueryBuilder('livro')
      .leftJoinAndSelect('livro.autor', 'autor')
      .leftJoinAndSelect('livro.categoria', 'categoria')
      .orderBy('livro.id', 'ASC');

    if (categoria) {
      consulta.andWhere('LOWER(categoria.nome) = LOWER(:categoria)', {
        categoria: categoria,
      });
    }

    if (autor) {
      consulta.andWhere('LOWER(autor.nome) = LOWER(:autor)', { autor: autor });
    }

    if (disponivel) {
      consulta.andWhere(
        'livro.exemplares > (SELECT COUNT(*) FROM emprestimos WHERE emprestimos.livroId = livro.id AND emprestimos.dataDevolucao IS NULL)',
      );
    }

    return consulta.getMany();
  }

  buscarPorId(id: number) {
    return this.repository.findOne({
      where: { id: id },
      relations: { autor: true, categoria: true },
    });
  }

  criar(dados: Partial<Livro>) {
    const livro = this.repository.create(dados);
    return this.repository.save(livro);
  }

  salvar(livro: Livro) {
    return this.repository.save(livro);
  }

  async remover(livro: Livro) {
    await this.repository.remove(livro);
  }

  contarEmprestimosEmAberto(livroId: number) {
    return this.emprestimosRepository.count({
      where: { livroId: livroId, dataDevolucao: IsNull() },
    });
  }
}
