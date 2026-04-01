import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const ingressosIds = createPedidoDto.ingressosIds || [];
    const lanchesIds = createPedidoDto.lanchesIds || [];

    if (ingressosIds.length === 0 && lanchesIds.length === 0) {
      throw new BadRequestException('O pedido precisa ter pelo menos um ingresso ou lanche.');
    }

    let valorTotalCalculado = 0;
    
    const ingressosParaConectar: { id: number }[] = [];
    const lanchesParaConectar: { id: number }[] = [];

    //calcula total de ingressos
    if (ingressosIds.length > 0) {
      const ingressos = await this.prisma.ingresso.findMany({
        where: { id: { in: ingressosIds } },
      });
      
      ingressos.forEach(ing => valorTotalCalculado += ing.valorPago);
      ingressosParaConectar.push(...ingressosIds.map(id => ({ id })));
    }

    //calcula o total dos lanches
    if (lanchesIds.length > 0) {
      const lanches = await this.prisma.lancheCombo.findMany({
        where: { id: { in: lanchesIds } },
      });
      
      lanches.forEach(lanche => valorTotalCalculado += lanche.preco);
      lanchesParaConectar.push(...lanchesIds.map(id => ({ id })));
    }

    return this.prisma.pedido.create({
      data: {
        valorTotal: valorTotalCalculado,
        ingressos: { connect: ingressosParaConectar },
        lanches: { connect: lanchesParaConectar },
      },
      include: { ingressos: true, lanches: true }, 
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: { ingressos: true, lanches: true },
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: { 
        ingressos: { include: { sessao: { include: { filme: true } } } }, 
        lanches: true 
      },
    });

    if (!pedido) throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    return pedido;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    throw new BadRequestException('Não é permitido alterar um pedido fechado. Por favor, cancele e crie um novo.');
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}