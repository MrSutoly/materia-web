import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CriarEmprestimoDto } from './dto/criar-emprestimo.dto';
import { EmprestimosService } from './emprestimos.service';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  criar(@Body() dto: CriarEmprestimoDto) {
    return this.emprestimosService.criar(dto);
  }

  @Patch(':id/devolucao')
  devolver(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.devolver(id);
  }
}
