import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Leitor } from '../../leitores/entities/leitor.entity';
import { Livro } from '../../livros/entities/livro.entity';

@Entity('emprestimos')
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  livroId: number;

  @Column({ type: 'integer' })
  leitorId: number;

  @Column({ type: 'datetime' })
  dataRetirada: Date;

  @Column({ type: 'datetime' })
  dataPrevista: Date;

  @Column({ type: 'datetime', nullable: true })
  dataDevolucao: Date | null;

  @Column({ type: 'float', default: 0 })
  multa: number;

  @ManyToOne(() => Livro, (livro) => livro.emprestimos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'livroId' })
  livro: Livro;

  @ManyToOne(() => Leitor, (leitor) => leitor.emprestimos)
  @JoinColumn({ name: 'leitorId' })
  leitor: Leitor;
}
