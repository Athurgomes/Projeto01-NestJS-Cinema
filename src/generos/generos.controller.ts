import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('generos') // Tag para organizar no Swagger
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo gênero' })
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os gêneros' })
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um gênero pelo ID' })
  findOne(@Param('id') id: string) {
    return this.generosService.findOne(+id); // O '+' converte a string da rota para número
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um gênero' })
  update(@Param('id') id: string, @Body() updateGeneroDto: UpdateGeneroDto) {
    return this.generosService.update(+id, updateGeneroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um gênero' })
  remove(@Param('id') id: string) {
    return this.generosService.remove(+id);
  }
}