import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngressosService } from './ingressos.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('ingressos')
@Controller('ingressos')
export class IngressosController {
  constructor(private readonly ingressosService: IngressosService) {}

  @Post()
  @ApiOperation({ summary: 'Vender um novo ingresso (Valida lotação da sala)' })
  create(@Body() createIngressoDto: CreateIngressoDto) {
    return this.ingressosService.create(createIngressoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os ingressos vendidos' })
  findAll() {
    return this.ingressosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um ingresso pelo ID' })
  findOne(@Param('id') id: string) {
    return this.ingressosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um ingresso' })
  update(@Param('id') id: string, @Body() updateIngressoDto: UpdateIngressoDto) {
    return this.ingressosService.update(+id, updateIngressoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar/Remover um ingresso' })
  remove(@Param('id') id: string) {
    return this.ingressosService.remove(+id);
  }
}