import { IsNotEmpty, IsString } from 'class-validator';

export class CriarAutorDto {
  @IsString({ message: 'nome deve ser um texto' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;
}
