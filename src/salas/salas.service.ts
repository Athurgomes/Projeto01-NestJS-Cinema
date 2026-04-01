import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    // Verifica se já existe uma sala com o mesmo número
    const salaExistente = await this.prisma.sala.findUnique({
      where: { numero: createSalaDto.numero },
    });

    if (salaExistente) {
      throw new ConflictException(`Já existe uma sala cadastrada com a identificação '${createSalaDto.numero}'.`);
    }

    return this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  findAll() {
    return this.prisma.sala.findMany();
  }

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
    });

    if (!sala) throw new NotFoundException(`Sala com ID ${id} não encontrada.`);
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    // Se o usuário tentar atualizar o número, precisamos checar se o novo número já não pertence a OUTRA sala
    if (updateSalaDto.numero) {
      const salaExistente = await this.prisma.sala.findUnique({
        where: { numero: updateSalaDto.numero },
      });
      
      if (salaExistente && salaExistente.id !== id) {
        throw new ConflictException(`A identificação '${updateSalaDto.numero}' já está em uso por outra sala.`);
      }
    }

    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  remove(id: number) {
    return this.prisma.sala.delete({
      where: { id },
    });
  }
}