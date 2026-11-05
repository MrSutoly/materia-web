import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CriarLivroDto {
  @IsString({ message: 'titulo deve ser um texto' })
  @IsNotEmpty({ message: 'titulo é obrigatório' })
  titulo: string;

  @IsInt({ message: 'exemplares deve ser um número inteiro' })
  @Min(1, { message: 'exemplares deve ser maior que zero' })
  exemplares: number;

  @IsInt({ message: 'autorId deve ser um número inteiro' })
  autorId: number;

  @IsInt({ message: 'categoriaId deve ser um número inteiro' })
  categoriaId: number;
}
