import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('filmes')
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo filme' })
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmesService.create(createFilmeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os filmes (com seus gêneros)' })
  findAll() {
    return this.filmesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um filme pelo ID' })
  findOne(@Param('id') id: string) {
    return this.filmesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um filme' })
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmesService.update(+id, updateFilmeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um filme' })
  remove(@Param('id') id: string) {
    return this.filmesService.remove(+id);
  }
}