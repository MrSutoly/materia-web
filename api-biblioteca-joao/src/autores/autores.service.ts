import { Injectable, NotFoundException } from '@nestjs/common';
import { AutoresRepository } from './autores.repository';
import { CriarAutorDto } from './dto/criar-autor.dto';

@Injectable()
export class AutoresService {
  constructor(private readonly autoresRepository: AutoresRepository) {}

  async listar() {
    return await this.autoresRepository.listar();
  }

  async buscarPorId(id: number) {
    const autor = await this.autoresRepository.buscarPorId(id);
    if (!autor) {
      throw new NotFoundException(`Autor ${id} não encontrado`);
    }
    return autor;
  }

  async criar(dto: CriarAutorDto) {
    return await this.autoresRepository.criar(dto.nome);
  }
}
