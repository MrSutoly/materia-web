import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CriarLeitorDto {
  @IsString({ message: 'nome deve ser um texto' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @IsString({ message: 'matricula deve ser um texto' })
  @IsNotEmpty({ message: 'matricula é obrigatória' })
  matricula: string;

  @IsEmail({}, { message: 'email deve ter um formato válido' })
  email: string;
}
