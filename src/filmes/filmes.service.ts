import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilmesService {
  constructor(private prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    //verifica se o gênero passado no ID realmente existe
    const generoExiste = await this.prisma.genero.findUnique({
      where: { id: createFilmeDto.generoId },
    });

    if (!generoExiste) {
      throw new NotFoundException(`Gênero com ID ${createFilmeDto.generoId} não encontrado.`);
    }

    //cria o filme
    return this.prisma.filme.create({
      data: createFilmeDto,
    });
  }

  findAll() {
    //include puxa os dados do gênero associado junto com o filme!
    return this.prisma.filme.findMany({
      include: { genero: true },
    });
  }

  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
      include: { genero: true },
    });

    if (!filme) throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    //se atualizar o gênero, verifica se o novo gênero existe
    if (updateFilmeDto.generoId) {
      const generoExiste = await this.prisma.genero.findUnique({
        where: { id: updateFilmeDto.generoId },
      });
      if (!generoExiste) throw new NotFoundException('Novo gênero não encontrado.');
    }

    return this.prisma.filme.update({
      where: { id },
      data: updateFilmeDto,
    });
  }

  remove(id: number) {
    return this.prisma.filme.delete({
      where: { id },
    });
  }
}