import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Livro } from '../../livros/entities/livro.entity';

@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
