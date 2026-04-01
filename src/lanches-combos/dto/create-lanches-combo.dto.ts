import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateLanchesComboDto {
  @ApiProperty({ example: 'Combo Família', description: 'Nome do lanche ou combo' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do lanche/combo é obrigatório' })
  nome: string;

  @ApiProperty({ example: '2 Pipocas Grandes + 2 Refrigerantes 1L', description: 'Descrição dos itens inclusos', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 45.90, description: 'Preço final do lanche ou combo' })
  @IsNumber()
  @Min(0, { message: 'O preço não pode ser negativo' })
  preco: number;
}