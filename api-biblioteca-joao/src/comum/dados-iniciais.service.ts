import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { LeitoresService } from '../leitores/leitores.service';
import { LivrosService } from '../livros/livros.service';

@Injectable()
export class DadosIniciaisService implements OnApplicationBootstrap {
  constructor(
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
    private readonly livrosService: LivrosService,
    private readonly leitoresService: LeitoresService,
  ) {}

  async onApplicationBootstrap() {
    const nomesAutores = ['Alexandre Dumas', 'Frank Herbert', 'Platão'];
    for (const nome of nomesAutores) {
      const autores = await this.autoresService.listar();
      if (!autores.find((autor) => autor.nome === nome)) {
        await this.autoresService.criar({ nome: nome });
      }
    }

    const nomesCategorias = ['Aventura', 'Ficção científica', 'Filosofia'];
    for (const nome of nomesCategorias) {
      const categorias = await this.categoriasService.listar();
      if (!categorias.find((categoria) => categoria.nome === nome)) {
        await this.categoriasService.criar({ nome: nome });
      }
    }

    const autores = await this.autoresService.listar();
    const categorias = await this.categoriasService.listar();

    const livros = [
      { titulo: 'O Conde de Monte Cristo', autor: 'Alexandre Dumas', categoria: 'Aventura' },
      { titulo: 'Duna', autor: 'Frank Herbert', categoria: 'Ficção científica' },
      { titulo: 'Messias de Duna', autor: 'Frank Herbert', categoria: 'Ficção científica' },
      { titulo: 'Filhos de Duna', autor: 'Frank Herbert', categoria: 'Ficção científica' },
      { titulo: 'A República', autor: 'Platão', categoria: 'Filosofia' },
    ];
    for (const livro of livros) {
      const cadastrados = await this.livrosService.listar();
      if (!cadastrados.find((item) => item.titulo === livro.titulo)) {
        await this.livrosService.criar({
          titulo: livro.titulo,
          exemplares: 3,
          autorId: autores.find((autor) => autor.nome === livro.autor)!.id,
          categoriaId: categorias.find((c) => c.nome === livro.categoria)!.id,
        });
      }
    }

    const leitores = [
      { nome: 'Ana Souza', matricula: '2024001', email: 'ana.souza@exemplo.com' },
      { nome: 'Bruno Lima', matricula: '2024002', email: 'bruno.lima@exemplo.com' },
      { nome: 'Carla Mendes', matricula: '2024003', email: 'carla.mendes@exemplo.com' },
      { nome: 'Diego Alves', matricula: '2024004', email: 'diego.alves@exemplo.com' },
      { nome: 'Elisa Rocha', matricula: '2024005', email: 'elisa.rocha@exemplo.com' },
    ];
    for (const leitor of leitores) {
      const existente = await this.leitoresService.buscarPorMatricula(
        leitor.matricula,
      );
      if (!existente) {
        await this.leitoresService.criar(leitor);
      }
    }
  }
}
