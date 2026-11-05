import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Livro } from '../../livros/entities/livro.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @OneToMany(() => Livro, (livro) => livro.categoria)
  livros: Livro[];
}
