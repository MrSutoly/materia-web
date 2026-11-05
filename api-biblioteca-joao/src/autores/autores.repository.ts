import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutoresRepository {
  constructor(
    @InjectRepository(Autor)
    private readonly repository: Repository<Autor>,
  ) {}

  listar() {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  criar(nome: string) {
    const autor = this.repository.create({ nome: nome });
    return this.repository.save(autor);
  }
}
