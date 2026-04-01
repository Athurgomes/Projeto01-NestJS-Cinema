import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateIngressoDto {
  @ApiProperty({ example: 1, description: 'ID da sessão escolhida' })
  @IsInt()
  @IsNotEmpty()
  sessaoId: number;

  @ApiProperty({ example: 'Meia', description: 'Tipo do ingresso (Ex: Inteira, Meia, VIP)' })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({ example: 12.75, description: 'Valor pago pelo ingresso' })
  @IsNumber()
  @Min(0)
  valorPago: number;

  @ApiProperty({ example: 1, description: 'ID do pedido associado (Opcional no momento da criação solta)', required: false })
  @IsOptional()
  @IsInt()
  pedidoId?: number;
}