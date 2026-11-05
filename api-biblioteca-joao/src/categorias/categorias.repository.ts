import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasRepository {
  constructor(
    @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria>,
  ) {}

  listar() {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  criar(nome: string) {
    const categoria = this.repository.create({ nome: nome });
    return this.repository.save(categoria);
  }
}
