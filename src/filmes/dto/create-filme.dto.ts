import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFilmeDto {
  @ApiProperty({ example: 'O Senhor dos Anéis: O Retorno do Rei', description: 'Título do filme' })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo: string;

  @ApiProperty({ example: 1, description: 'ID do gênero (deve existir na tabela de gêneros)' })
  @IsInt({ message: 'O ID do gênero deve ser um número inteiro' })
  generoId: number;

  @ApiProperty({ example: 200, description: 'Duração do filme em minutos' })
  @IsInt()
  @Min(1, { message: 'A duração deve ser de pelo menos 1 minuto' })
  duracao: number;

  @ApiProperty({ example: '12', description: 'Classificação etária (L, 10, 12, 14, 16, 18)' })
  @IsString()
  @IsNotEmpty({ message: 'A classificação etária é obrigatória' })
  classificacaoEtaria: string;
}