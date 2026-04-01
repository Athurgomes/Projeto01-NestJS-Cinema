import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessoesService {
  constructor(private prisma: PrismaService) {}

  async create(createSessoeDto: CreateSessoeDto) {
    //verifica se sala e o filme existem
    const sala = await this.prisma.sala.findUnique({ where: { id: createSessoeDto.salaId } });
    if (!sala) throw new NotFoundException('Sala não encontrada.');

    const filme = await this.prisma.filme.findUnique({ where: { id: createSessoeDto.filmeId } });
    if (!filme) throw new NotFoundException('Filme não encontrado.');

    //sobreposição de horários
    const novoInicio = new Date(createSessoeDto.dataHorario).getTime(); 
    const novoFim = novoInicio + (filme.duracao * 60000);

    const sessoesDaSala = await this.prisma.sessao.findMany({
      where: { salaId: createSessoeDto.salaId },
      include: { filme: true },
    });

    const conflito = sessoesDaSala.find(sessaoAgendada => {
      const inicioAgendado = sessaoAgendada.dataHorario.getTime();
      const fimAgendado = inicioAgendado + (sessaoAgendada.filme.duracao * 60000);
      
      return novoInicio < fimAgendado && novoFim > inicioAgendado;
    });

    if (conflito) {
      throw new BadRequestException('Já existe uma sessão agendada para esta sala que entra em conflito com este horário.');
    }

    //cria a sessão
    return this.prisma.sessao.create({
      data: createSessoeDto,
    });
  }

  findAll() {
    return this.prisma.sessao.findMany({
      include: { filme: true, sala: true },
    });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: { filme: true, sala: true },
    });

    if (!sessao) throw new NotFoundException(`Sessão com ID ${id} não encontrada.`);
    return sessao;
  }

  update(id: number, updateSessoeDto: UpdateSessoeDto) {
    return this.prisma.sessao.update({
      where: { id },
      data: updateSessoeDto,
    });
  }

  remove(id: number) {
    return this.prisma.sessao.delete({
      where: { id },
    });
  }
}