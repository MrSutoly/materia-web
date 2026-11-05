import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarLeitorDto } from './dto/criar-leitor.dto';
import { LeitoresRepository } from './leitores.repository';

@Injectable()
export class LeitoresService {
  constructor(private readonly leitoresRepository: LeitoresRepository) {}

  async buscarPorId(id: number) {
    const leitor = await this.leitoresRepository.buscarPorId(id);
    if (!leitor) {
      throw new NotFoundException(`Leitor ${id} não encontrado`);
    }
    return leitor;
  }

  async buscarPorMatricula(matricula: string) {
    return await this.leitoresRepository.buscarPorMatricula(matricula);
  }

  async criar(dto: CriarLeitorDto) {
    const existente = await this.leitoresRepository.buscarPorMatricula(
      dto.matricula,
    );
    if (existente) {
      throw new ConflictException(
        `Matrícula ${dto.matricula} já está cadastrada`,
      );
    }

    return await this.leitoresRepository.criar({
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    });
  }

  async listarEmprestimos(id: number, status?: string) {
    if (status !== undefined && status !== 'aberto') {
      throw new BadRequestException('O filtro status só aceita o valor aberto');
    }

    await this.buscarPorId(id);

    return await this.leitoresRepository.listarEmprestimos(
      id,
      status === 'aberto',
    );
  }
}
