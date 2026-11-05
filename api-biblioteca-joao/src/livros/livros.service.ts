import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { LivrosRepository } from './livros.repository';

@Injectable()
export class LivrosService {
  constructor(
    private readonly livrosRepository: LivrosRepository,
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async listar(categoria?: string, autor?: string, disponivel?: string) {
    if (categoria !== undefined && categoria.trim() === '') {
      throw new BadRequestException('O filtro categoria não pode ser vazio');
    }

    if (autor !== undefined && autor.trim() === '') {
      throw new BadRequestException('O filtro autor não pode ser vazio');
    }

    if (disponivel !== undefined && disponivel !== 'true') {
      throw new BadRequestException(
        'O filtro disponivel só aceita o valor true',
      );
    }

    return await this.livrosRepository.listar(
      categoria,
      autor,
      disponivel === 'true',
    );
  }

  async buscarPorId(id: number) {
    const livro = await this.livrosRepository.buscarPorId(id);
    if (!livro) {
      throw new NotFoundException(`Livro ${id} não encontrado`);
    }
    return livro;
  }

  async criar(dto: CriarLivroDto) {
    await this.autoresService.buscarPorId(dto.autorId);
    await this.categoriasService.buscarPorId(dto.categoriaId);

    return await this.livrosRepository.criar({
      titulo: dto.titulo,
      exemplares: dto.exemplares,
      autorId: dto.autorId,
      categoriaId: dto.categoriaId,
    });
  }

  async atualizar(id: number, dto: AtualizarLivroDto) {
    const livro = await this.buscarPorId(id);

    if (dto.autorId !== undefined) {
      await this.autoresService.buscarPorId(dto.autorId);
      livro.autorId = dto.autorId;
    }

    if (dto.categoriaId !== undefined) {
      await this.categoriasService.buscarPorId(dto.categoriaId);
      livro.categoriaId = dto.categoriaId;
    }

    if (dto.titulo !== undefined) {
      livro.titulo = dto.titulo;
    }

    if (dto.exemplares !== undefined) {
      livro.exemplares = dto.exemplares;
    }

    await this.livrosRepository.salvar(livro);
    return await this.buscarPorId(id);
  }

  async remover(id: number) {
    const livro = await this.buscarPorId(id);

    const emAberto = await this.livrosRepository.contarEmprestimosEmAberto(id);
    if (emAberto > 0) {
      throw new ConflictException(
        `Livro ${id} possui empréstimos em aberto e não pode ser excluído`,
      );
    }

    await this.livrosRepository.remover(livro);
  }
}
