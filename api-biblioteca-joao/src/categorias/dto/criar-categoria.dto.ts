import { IsNotEmpty, IsString } from 'class-validator';

export class CriarCategoriaDto {
  @IsString({ message: 'nome deve ser um texto' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;
}
