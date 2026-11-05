import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriasRepository } from './categorias.repository';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriasRepository) {}

  async listar() {
    return await this.categoriasRepository.listar();
  }

  async buscarPorId(id: number) {
    const categoria = await this.categoriasRepository.buscarPorId(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} não encontrada`);
    }
    return categoria;
  }

  async criar(dto: CriarCategoriaDto) {
    return await this.categoriasRepository.criar(dto.nome);
  }
}
