import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Autor } from '../../autores/entities/autor.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Emprestimo } from '../../emprestimos/entities/emprestimo.entity';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  titulo: string;

  @Column({ type: 'integer' })
  exemplares: number;

  @Column({ type: 'integer' })
  autorId: number;

  @Column({ type: 'integer' })
  categoriaId: number;

  @ManyToOne(() => Autor, (autor) => autor.livros)
  @JoinColumn({ name: 'autorId' })
  autor: Autor;

  @ManyToOne(() => Categoria, (categoria) => categoria.livros)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
  emprestimos: Emprestimo[];
}
