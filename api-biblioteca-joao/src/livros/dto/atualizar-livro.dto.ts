import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class AtualizarLivroDto {
  @IsOptional()
  @IsString({ message: 'titulo deve ser um texto' })
  @IsNotEmpty({ message: 'titulo não pode ser vazio' })
  titulo?: string;

  @IsOptional()
  @IsInt({ message: 'exemplares deve ser um número inteiro' })
  @Min(1, { message: 'exemplares deve ser maior que zero' })
  exemplares?: number;

  @IsOptional()
  @IsInt({ message: 'autorId deve ser um número inteiro' })
  autorId?: number;

  @IsOptional()
  @IsInt({ message: 'categoriaId deve ser um número inteiro' })
  categoriaId?: number;
}
