import { Injectable, NotFoundException } from '@nestjs/common';
import { JaDevolvidoException } from '../comum/excecoes/ja-devolvido.exception';
import { LimiteEmprestimosException } from '../comum/excecoes/limite-emprestimos.exception';
import { SemExemplarException } from '../comum/excecoes/sem-exemplar.exception';
import { LeitoresService } from '../leitores/leitores.service';
import { LivrosService } from '../livros/livros.service';
import { CriarEmprestimoDto } from './dto/criar-emprestimo.dto';
import { EmprestimosRepository } from './emprestimos.repository';

const MS_POR_DIA = 24 * 60 * 60 * 1000;
const PRAZO_EM_DIAS = 14;
const LIMITE_EMPRESTIMOS = 3;
const MULTA_POR_DIA = 1;

@Injectable()
export class EmprestimosService {
  constructor(
    private readonly emprestimosRepository: EmprestimosRepository,
    private readonly livrosService: LivrosService,
    private readonly leitoresService: LeitoresService,
  ) {}

  async criar(dto: CriarEmprestimoDto) {
    const livro = await this.livrosService.buscarPorId(dto.livroId);
    const leitor = await this.leitoresService.buscarPorId(dto.leitorId);

    const abertosDoLivro = await this.emprestimosRepository.contarAbertosPorLivro(
      livro.id,
    );
    if (livro.exemplares - abertosDoLivro <= 0) {
      throw new SemExemplarException(livro.id);
    }

    const abertosDoLeitor =
      await this.emprestimosRepository.contarAbertosPorLeitor(leitor.id);
    if (abertosDoLeitor >= LIMITE_EMPRESTIMOS) {
      throw new LimiteEmprestimosException(leitor.id);
    }

    const dataRetirada = dto.dataRetirada
      ? new Date(dto.dataRetirada)
      : new Date();
    const dataPrevista = new Date(
      dataRetirada.getTime() + PRAZO_EM_DIAS * MS_POR_DIA,
    );

    return await this.emprestimosRepository.criar({
      livroId: livro.id,
      leitorId: leitor.id,
      dataRetirada: dataRetirada,
      dataPrevista: dataPrevista,
      dataDevolucao: null,
      multa: 0,
    });
  }

  async devolver(id: number) {
    const emprestimo = await this.emprestimosRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo ${id} não encontrado`);
    }

    if (emprestimo.dataDevolucao) {
      throw new JaDevolvidoException(id);
    }

    const dataDevolucao = new Date();
    const atraso = dataDevolucao.getTime() - emprestimo.dataPrevista.getTime();
    const diasAtraso = atraso > 0 ? Math.floor(atraso / MS_POR_DIA) : 0;

    emprestimo.dataDevolucao = dataDevolucao;
    emprestimo.multa = diasAtraso * MULTA_POR_DIA;

    return await this.emprestimosRepository.salvar(emprestimo);
  }
}
