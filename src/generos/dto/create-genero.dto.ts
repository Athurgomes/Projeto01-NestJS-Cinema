import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty({ example: 'Ação', description: 'O nome do gênero do filme' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do gênero não pode estar vazio' })
  nome: string;
}