import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CriarLeitorDto } from './dto/criar-leitor.dto';
import { LeitoresService } from './leitores.service';

@Controller('leitores')
export class LeitoresController {
  constructor(private readonly leitoresService: LeitoresService) {}

  @Post()
  criar(@Body() dto: CriarLeitorDto) {
    return this.leitoresService.criar(dto);
  }

  @Get(':id/emprestimos')
  listarEmprestimos(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status?: string,
  ) {
    return this.leitoresService.listarEmprestimos(id, status);
  }
}
