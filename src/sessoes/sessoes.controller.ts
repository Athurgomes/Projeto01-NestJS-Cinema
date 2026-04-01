import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('sessoes')
@Controller('sessoes')
export class SessoesController {
  constructor(private readonly sessoesService: SessoesService) {}

  @Post()
  @ApiOperation({ summary: 'Agendar uma nova sessão (Valida conflito de horário)' })
  create(@Body() createSessoeDto: CreateSessoeDto) {
    return this.sessoesService.create(createSessoeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as sessões (com dados do filme e da sala)' })
  findAll() {
    return this.sessoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma sessão pelo ID' })
  findOne(@Param('id') id: string) {
    return this.sessoesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma sessão' })
  update(@Param('id') id: string, @Body() updateSessoeDto: UpdateSessoeDto) {
    return this.sessoesService.update(+id, updateSessoeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar uma sessão' })
  remove(@Param('id') id: string) {
    return this.sessoesService.remove(+id);
  }
}