import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { LivrosService } from './livros.service';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  listar(
    @Query('categoria') categoria?: string,
    @Query('autor') autor?: string,
    @Query('disponivel') disponivel?: string,
  ) {
    return this.livrosService.listar(categoria, autor, disponivel);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dto: CriarLivroDto) {
    return this.livrosService.criar(dto);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarLivroDto,
  ) {
    return this.livrosService.atualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.remover(id);
  }
}
