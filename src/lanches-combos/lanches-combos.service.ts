import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanchesComboDto } from './dto/create-lanches-combo.dto';
import { UpdateLanchesComboDto } from './dto/update-lanches-combo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LanchesCombosService {
  constructor(private prisma: PrismaService) {}

  create(createLancheComboDto: CreateLanchesComboDto) {
    return this.prisma.lancheCombo.create({
      data: createLancheComboDto,
    });
  }

  findAll() {
    return this.prisma.lancheCombo.findMany();
  }

  async findOne(id: number) {
    const lanche = await this.prisma.lancheCombo.findUnique({
      where: { id },
    });

    if (!lanche) throw new NotFoundException(`Lanche/Combo com ID ${id} não encontrado.`);
    return lanche;
  }

  update(id: number, updateLancheComboDto: UpdateLanchesComboDto) {
    return this.prisma.lancheCombo.update({
      where: { id },
      data: updateLancheComboDto,
    });
  }

  remove(id: number) {
    return this.prisma.lancheCombo.delete({
      where: { id },
    });
  }
}