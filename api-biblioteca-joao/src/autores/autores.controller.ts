import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CriarAutorDto } from './dto/criar-autor.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Get()
  listar() {
    return this.autoresService.listar();
  }

  @Post()
  criar(@Body() dto: CriarAutorDto) {
    return this.autoresService.criar(dto);
  }
}
