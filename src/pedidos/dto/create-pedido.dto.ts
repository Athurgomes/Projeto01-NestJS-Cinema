import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({ example: [1, 2], description: 'Lista de IDs dos Ingressos', required: false })
  @IsArray()
  @IsOptional()
  ingressosIds?: number[];

  @ApiProperty({ example: [1], description: 'Lista de IDs dos Lanches ou Combos', required: false })
  @IsArray()
  @IsOptional()
  lanchesIds?: number[];
}