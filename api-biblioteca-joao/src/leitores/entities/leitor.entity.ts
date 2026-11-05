import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emprestimo } from '../../emprestimos/entities/emprestimo.entity';

@Entity('leitores')
export class Leitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar', unique: true })
  matricula: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.leitor)
  emprestimos: Emprestimo[];
}
