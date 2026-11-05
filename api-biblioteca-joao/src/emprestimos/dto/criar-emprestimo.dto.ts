import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CriarEmprestimoDto {
  @IsInt({ message: 'livroId deve ser um número inteiro' })
  livroId: number;

  @IsInt({ message: 'leitorId deve ser um número inteiro' })
  leitorId: number;

  @IsOptional()
  @IsDateString({}, { message: 'dataRetirada deve ser uma data válida' })
  dataRetirada?: string;
}
