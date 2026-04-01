import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 1', description: 'Número ou identificação única da sala' })
  @IsString()
  @IsNotEmpty({ message: 'A identificação da sala é obrigatória' })
  numero: string;

  @ApiProperty({ example: 150, description: 'Capacidade máxima de assentos da sala' })
  @IsInt({ message: 'A capacidade deve ser um número inteiro' })
  @Min(1, { message: 'A sala deve ter pelo menos 1 assento' })
  capacidade: number;
}