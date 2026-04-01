import { Injectable, ConflictException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenerosService {
  constructor(private prisma: PrismaService) {}

  async create(createGeneroDto: CreateGeneroDto) {
    // Verifica se já existe um gênero com esse nome
    const generoExistente = await this.prisma.genero.findUnique({
      where: { nome: createGeneroDto.nome },
    });

    if (generoExistente) {
      throw new ConflictException('Já existe um gênero cadastrado com este nome.');
    }

    return this.prisma.genero.create({
      data: createGeneroDto,
    });
  }

  findAll() {
    return this.prisma.genero.findMany();
  }

  findOne(id: number) {
    return this.prisma.genero.findUnique({
      where: { id },
    });
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return this.prisma.genero.update({
      where: { id },
      data: updateGeneroDto,
    });
  }

  remove(id: number) {
    return this.prisma.genero.delete({
      where: { id },
    });
  }
}