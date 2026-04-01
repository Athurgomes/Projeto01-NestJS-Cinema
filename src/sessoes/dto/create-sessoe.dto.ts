import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSessoeDto {
  @ApiProperty({ example: 1, description: 'ID do filme que será exibido' })
  @IsInt()
  @IsNotEmpty()
  filmeId: number;

  @ApiProperty({ example: 1, description: 'ID da sala onde ocorrerá a sessão' })
  @IsInt()
  @IsNotEmpty()
  salaId: number;

  @ApiProperty({ example: '2026-04-15T19:30:00Z', description: 'Data e horário de início da sessão' })
  @IsDateString({}, { message: 'A data deve estar em um formato ISO 8601 válido' })
  @IsNotEmpty()
  dataHorario: string;

  @ApiProperty({ example: 25.50, description: 'Valor do ingresso para esta sessão' })
  @IsNumber()
  @Min(0, { message: 'O valor do ingresso não pode ser negativo' })
  valorIngresso: number;
}