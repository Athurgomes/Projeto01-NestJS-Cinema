import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanchesCombosService } from './lanches-combos.service';
import { CreateLanchesComboDto } from './dto/create-lanches-combo.dto';
import { UpdateLanchesComboDto } from './dto/update-lanches-combo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('lanches-combos')
@Controller('lanches-combos')
export class LanchesCombosController {
  constructor(private readonly lanchesCombosService: LanchesCombosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo lanche ou combo' })
  create(@Body() createLancheComboDto: CreateLanchesComboDto) {
    return this.lanchesCombosService.create(createLancheComboDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os lanches e combos do cardápio' })
  findAll() {
    return this.lanchesCombosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um lanche ou combo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.lanchesCombosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um lanche ou combo' })
  update(@Param('id') id: string, @Body() updateLancheComboDto: UpdateLanchesComboDto) {
    return this.lanchesCombosService.update(+id, updateLancheComboDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um lanche ou combo do cardápio' })
  remove(@Param('id') id: string) {
    return this.lanchesCombosService.remove(+id);
  }
}