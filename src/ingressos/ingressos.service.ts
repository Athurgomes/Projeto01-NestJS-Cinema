import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngressosService {
  constructor(private prisma: PrismaService) {}

  async create(createIngressoDto: CreateIngressoDto) {
    //busca a sessão e inclui os dados da sala para sabermos a capacidade
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: createIngressoDto.sessaoId },
      include: { sala: true },
    });

    if (!sessao) {
      throw new NotFoundException('Sessão não encontrada.');
    }

    //conta quantos ingressos já existem no banco para esta exata sessão
    const ingressosVendidos = await this.prisma.ingresso.count({
      where: { sessaoId: createIngressoDto.sessaoId },
    });

    //controle de Capacidade
    if (ingressosVendidos >= sessao.sala.capacidade) {
      throw new BadRequestException(`Lotação esgotada! A sala suporta apenas ${sessao.sala.capacidade} assentos.`);
    }

    //cria o ingresso se passou pela validação
    return this.prisma.ingresso.create({
      data: createIngressoDto,
    });
  }

  findAll() {
    return this.prisma.ingresso.findMany({
      include: { sessao: { include: { filme: true, sala: true } } },
    });
  }

  async findOne(id: number) {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: true },
    });

    if (!ingresso) throw new NotFoundException(`Ingresso com ID ${id} não encontrado.`);
    return ingresso;
  }

  update(id: number, updateIngressoDto: UpdateIngressoDto) {
    return this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
    });
  }

  remove(id: number) {
    return this.prisma.ingresso.delete({
      where: { id },
    });
  }
}